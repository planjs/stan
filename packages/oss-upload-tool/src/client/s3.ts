import { join } from 'path';
import { createReadStream } from 'fs';

import { S3 } from 'aws-sdk';
import { defer } from '@planjs/utils';
import { lodash } from 'stan-utils';

import { Client } from '../oss_client';
import type { OSSUploadOptions, OSSUploadLocalItem } from '../types';
import type { UploadResp, UploadOptions } from '../../lib/oss_client';
import { defaultVal, getGlobalValue } from '../utils';
import {
  BUCKET_KEY,
  DEFAULT_TIMEOUT,
  REGION_KEY,
  S3_BUCKET_KEY,
  S3_REGION_KEY,
  S3_SECRET_ID,
  S3_SECRET_KEY,
  SECRET_ID,
  SECRET_KEY,
  UPLOAD_TIMEOUT_KEY,
} from '../consts';

class S3Client extends Client<Partial<S3.Types.ClientConfiguration>, S3.Types.PutObjectRequest> {
  readonly #client!: S3;

  constructor(options: OSSUploadOptions) {
    super(options);
    this.#client = new S3(lodash.defaultsDeep(this.globalOptions, this.opt?.S3Options!));
  }

  getUploadedUrl = async (
    item: OSSUploadLocalItem,
    params: Partial<any> | undefined,
  ): Promise<UploadResp> => {
    return {
      url:
        'http://' +
        join(
          `${params?.Bucket || this.globalUploadParams.Bucket}.s3.${
            this.opt?.S3Options?.region || this.globalOptions?.region
          }.amazonaws.com`,
          item.path,
        ),
    };
  };

  get globalOptions(): Partial<Partial<S3.ClientConfiguration>> {
    const accessKeyId = getGlobalValue(S3_SECRET_ID, SECRET_ID)!;
    const secretAccessKey = getGlobalValue(S3_SECRET_KEY, SECRET_KEY)!;
    const region = getGlobalValue(S3_REGION_KEY, BUCKET_KEY)!;
    const timeout = getGlobalValue(UPLOAD_TIMEOUT_KEY);
    return {
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
      httpOptions: {
        timeout: Number.isNaN(+timeout!)
          ? defaultVal(this.opt.timeout, DEFAULT_TIMEOUT)
          : +timeout!,
      },
    };
  }

  get globalUploadParams(): Partial<S3.Types.PutObjectRequest> {
    const Bucket = getGlobalValue(S3_BUCKET_KEY, REGION_KEY)!;
    return {
      Bucket,
    };
  }

  upload = (
    item: OSSUploadLocalItem,
    params?: Partial<S3.Types.PutObjectRequest>,
    options?: UploadOptions,
  ): Promise<UploadResp> => {
    const p = defer<UploadResp>();
    this.#client
      .upload(
        {
          Bucket: '',
          Key: item.path,
          Body: createReadStream(item.filePath),
          ...this.globalUploadParams,
          ...params,
        },
        {
          partSize: 1024 * 1024 * 5,
          ...options,
        },
        (err, data) => {
          if (err) {
            p.reject(err);
            return;
          }
          p.resolve({
            ...data,
            url: data.Location,
          });
        },
      )
      .on('httpUploadProgress', (info) => {
        options?.onProgress?.(info.loaded, info.total);
      });
    return p.promise;
  };
}

export default S3Client;
