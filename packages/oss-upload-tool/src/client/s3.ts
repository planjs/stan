import { createReadStream } from 'fs';
import { URL } from 'url';

import { S3Client as S3 } from '@aws-sdk/client-s3';
import type { S3ClientConfig, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AbortController } from '@smithy/abort-controller';
import { lodash } from 'stan-utils';

import { Client } from '../oss_client';
import type { OSSUploadOptions, OSSUploadLocalItem } from '../types';
import type { UploadResp, UploadOptions } from '../oss_client';
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

class S3Client extends Client<Partial<S3ClientConfig>, PutObjectCommandInput> {
  readonly #client!: S3;

  constructor(options: OSSUploadOptions) {
    super(options);
    this.#client = new S3(lodash.defaultsDeep(this.globalOptions, this.opt?.S3Options!));
  }

  getUploadedUrl = async (
    item: OSSUploadLocalItem,
    params: Partial<any> | undefined,
  ): Promise<UploadResp> => {
    const uri = new URL(
      this.opt?.origin ||
        `http://${params?.Bucket || this.globalUploadParams.Bucket}.s3.${
          this.opt?.S3Options?.region || this.globalOptions?.region
        }.amazonaws.com`,
    );
    uri.pathname = item.path;
    return {
      url: uri.href,
    };
  };

  get globalOptions(): Partial<Partial<S3ClientConfig>> {
    const accessKeyId = getGlobalValue(S3_SECRET_ID, SECRET_ID)!;
    const secretAccessKey = getGlobalValue(S3_SECRET_KEY, SECRET_KEY)!;
    const region = getGlobalValue(S3_REGION_KEY, BUCKET_KEY)!;
    return {
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    };
  }

  get globalUploadParams(): Partial<PutObjectCommandInput> {
    const Bucket = getGlobalValue(S3_BUCKET_KEY, REGION_KEY)!;
    return {
      Bucket,
    };
  }

  getTimeout() {
    const timeout = getGlobalValue(UPLOAD_TIMEOUT_KEY);

    return Number.isNaN(+timeout!) ? defaultVal(this.opt.timeout, DEFAULT_TIMEOUT) : +timeout!;
  }

  upload = async (
    item: OSSUploadLocalItem,
    params?: Partial<PutObjectCommandInput>,
    options?: UploadOptions,
  ): Promise<UploadResp> => {
    const _params = {
      Bucket: '',
      Key: item.path,
      Body: createReadStream(item.filePath),
      ...this.globalUploadParams,
      ...params,
    };

    const abortController = new AbortController();

    const parallelUploads3 = new Upload({
      client: this.#client,
      params: _params,
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
      abortController,
    });

    const timer = setTimeout(() => {
      abortController.abort();
    }, this.getTimeout());

    parallelUploads3.on('httpUploadProgress', (progress) => {
      options?.onProgress?.(progress.loaded! || 0, progress.total! || 0);
    });

    try {
      const res = await parallelUploads3.done();
      return {
        ...res,
        ...(await this.getUploadedUrl(item, _params)),
      } as UploadResp;
    } finally {
      clearTimeout(timer);
    }
  };
}

export default S3Client;
