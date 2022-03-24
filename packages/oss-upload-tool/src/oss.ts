import { relative } from 'path';
import { chalk, globby, Listr, slash, pms } from 'stan-utils';
import { isPlanObject } from '@planjs/utils';

import COSClient from './client/cos';
import AOSSClient from './client/ali-oss';

import getUploadList from './get-upload-list';
import type { OSSUploadOptions, OSSUploadTarget, OSSUploadLocalItem } from './types';
import type { Client, UploadResp } from './oss_client';

async function ossUpload(options: OSSUploadOptions) {
  const {
    targets,
    cwd = process.cwd(),
    parallelLimit = 3,
    uploadParams,
    verbose,
    timeout,
  } = options;
  const type =
    options.type || options?.COSOptions !== undefined
      ? 'COS'
      : options?.AOSSOptions !== undefined
      ? 'AOSS'
      : 'COS';

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

    uploadFiles.forEach((item) => {
      const title = `Uploading ${chalk.yellow(
        slash(relative(cwd, item.filePath)),
      )} to ${chalk.green(item.path)}`;
      tasks.add({
        title,
        task: (ctx, task) => {
          const start = Date.now();
          return oss
            .upload(item, uploadParams, {
              onProgress(loaded: number, total: number) {
                task.output = `${((loaded / total) * 100).toFixed(2)}%`;
              },
            })
            .then((res) => {
              const { url } = res;
              task.title =
                title.replace('Uploading', 'Uploaded') +
                ` ${pms(Date.now() - start)} -> ${chalk.greenBright(url)}`;
              ctx.push(res);
            });
        },
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
