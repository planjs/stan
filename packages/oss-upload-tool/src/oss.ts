import { relative } from 'path';
import { chalk, globby, Listr, slash, pms, multimatch, getFileEtag } from 'stan-utils';
import { isPlanObject, retry, asyncPool } from '@planjs/utils';

import COSClient from './client/cos';
import AOSSClient from './client/ali-oss';
import S3Client from './client/s3';
import getUploadList from './get-upload-list';
import type { OSSUploadOptions, OSSUploadTarget, OSSUploadLocalItem } from './types';
import { OSSToolClientType } from './types';
import type { Client, UploadResp } from './oss_client';
import {
  COS_SECRET_ID,
  ALIOSS_SECRET_ID,
  COS_SECRET_KEY,
  ALIOSS_SECRET_KEY,
  ALIOSS_ENDPOINT_KEY,
  S3_SECRET_ID,
  S3_SECRET_KEY,
} from './consts';
import { getGlobalValue, getRemoteFileInfo } from './utils';

function getUploadType(options: OSSUploadOptions): keyof typeof OSSToolClientType | void {
  if (options?.type) return options.type!;

  const map: Array<[any, string[], keyof typeof OSSToolClientType]> = [
    [options?.COSOptions, [COS_SECRET_ID, COS_SECRET_KEY], 'COS'],
    [options?.AOSSOptions, [ALIOSS_ENDPOINT_KEY, ALIOSS_SECRET_ID, ALIOSS_SECRET_KEY], 'AOSS'],
    [options?.S3Options, [S3_SECRET_ID, S3_SECRET_KEY], 'S3'],
  ];
  for (const [o, k, t] of map) {
    if (o !== undefined) {
      return t;
    }
    if (getGlobalValue(...k)) {
      return t;
    }
  }
  return 'COS';
}

async function ossUpload(options: OSSUploadOptions) {
  const {
    targets,
    cwd = process.cwd(),
    parallelLimit = 5,
    uploadParams,
    maxAttempts = 0,
    verbose,
    existCheck = false,
  } = options;
  const type = getUploadType(options);

  const _targets: OSSUploadTarget[] = Array.isArray(targets)
    ? targets
    : isPlanObject(targets)
    ? [targets!]
    : [];

  if (_targets.length) {
    const uploadFiles: OSSUploadLocalItem[] = [];
    for (const target of _targets) {
      const { dest, rename, transform, src, ...tar } = target;

      const matchedPaths = await globby(src, {
        expandDirectories: false,
        onlyFiles: false,
        cwd,
        ...tar,
      });

      (Array.isArray(dest) ? dest : [dest]).forEach((v) => {
        uploadFiles.push(
          ...getUploadList(matchedPaths, v, {
            flatten: target.flatten,
            rename,
            transform,
            cwd,
          }),
        );
      });
    }

    let oss: Client;

    switch (type) {
      case 'COS':
        oss = new COSClient(options!);
        break;
      case 'AOSS':
        oss = new AOSSClient(options!);
        break;
      case 'S3':
        oss = new S3Client(options!);
        break;
      default:
        console.log(chalk.red(`${type} is not support.`));
        return Promise.reject(new Error('oss type is not support'));
    }

    if (!uploadFiles.length) {
      console.log(chalk.yellow('No items to upload'));
      return Promise.reject(new Error('No items to upload'));
    }

    const tasks = new Listr<UploadResp[]>({
      concurrent: parallelLimit,
      renderer: verbose ? 'verbose' : 'default',
    });

    const pool = asyncPool({
      maxConcurrency: parallelLimit,
    });

    uploadFiles.forEach((item) => {
      pool.executor(() => {
        return new Promise<void>((resolve, reject) => {
          const title = `Uploading ${chalk.yellow(
            slash(relative(cwd, item.filePath)),
          )} to ${chalk.green(item.path)}`;
          tasks.add({
            title,
            task: async (ctx, task) => {
              const start = Date.now();

              if (
                (typeof existCheck === 'boolean' && existCheck) ||
                ((typeof existCheck === 'string' || Array.isArray(existCheck)) &&
                  multimatch(item.path, existCheck).length)
              ) {
                const res = await oss.getUploadedUrl(item, uploadParams);
                try {
                  const { etag } = await getRemoteFileInfo(res.url);
                  if (etag ? etag.includes(getFileEtag(item.filePath)) : true) {
                    const { url } = res;
                    task.title =
                      title.replace('Uploading', 'File exists') +
                      ` ${pms(Date.now() - start)} -> ${chalk.greenBright(url)}`;
                    ctx.push(res);
                    resolve();
                    return;
                  }
                } catch (e) {}
              }

              return retry(oss.upload, { maxAttempts: maxAttempts + 1 })(item, uploadParams, {
                onProgress(loaded: number, total: number) {
                  task.output = `${((loaded / total) * 100).toFixed(2)}%`;
                },
              }).then(
                (res) => {
                  const { url } = res;
                  task.title =
                    title.replace('Uploading', 'Uploaded') +
                    ` ${pms(Date.now() - start)} -> ${chalk.greenBright(url)}`;
                  ctx.push(res);
                  resolve();
                },
                (err) => {
                  reject();
                  return Promise.reject(err);
                },
              );
            },
          });
        });
      });
    });

    try {
      const start = Date.now();
      const result = await tasks.run([]);
      console.log(chalk.green(` Upload successfully ${pms(Date.now() - start)}.`));
      return result;
    } catch (e) {
      console.log(chalk.red(` Upload failed`));
      return Promise.reject(e);
    }
  }

  console.log(chalk.yellow('No items to upload'));
  return Promise.reject(new Error('No items to upload'));
}

export default ossUpload;
