import { chalk, globby } from 'stan-utils';
import { isPlanObject, asyncPool, settleAll } from '@planjs/utils';

import COSClient from './client/cos';
import AOSSClient from './client/ali-oss';

import getUploadList from './get-upload-list';
import type { OSSUploadOptions, OSSUploadTarget, OSSUploadLocalItem } from './types';
import type { Client } from './oss_client';

async function ossUpload(options: OSSUploadOptions) {
  const { targets, cwd = process.cwd(), parallelLimit = 3, uploadParams } = options;
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

      uploadFiles.push(
        ...(Array.isArray(dest)
          ? dest.reduce<OSSUploadLocalItem[]>(
              (acc, v) => [
                ...acc,
                ...getUploadList(matchedPaths, v, {
                  flatten: target.flatten,
                  rename,
                  transform,
                  cwd,
                }),
              ],
              [],
            )
          : getUploadList(matchedPaths, dest, { flatten: target.flatten, rename, transform, cwd })),
      );
    }

    const pool = asyncPool({ maxConcurrency: parallelLimit });

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

    const { errors } = await settleAll(
      uploadFiles.map((item) => pool.executor(() => oss.upload(item, uploadParams))),
    );
    if (errors.length) {
      console.log(chalk.red(`Upload failed`));
      throw errors;
    } else {
      console.log(chalk.green(`Upload successfully`));
    }

    return;
  }

  console.log(chalk.yellow('No items to upload'));
  return Promise.reject(new Error('No items to upload'));
}

export default ossUpload;
