import COS from 'cos-nodejs-sdk-v5';
import { REG_URI } from '@planjs/utils';

import { Client } from '../oss_client';
import { isStatusCodeOK, createUploadSpinner, getGlobalValue } from '../utils';
import {
  BUCKET_KEY,
  COS_BUCKET_KEY,
  COS_REGION_KEY,
  COS_SECRET_ID,
  COS_SECRET_KEY,
  REGION_KEY,
  SECRET_ID,
  SECRET_KEY,
} from '../consts';
import type { OSSUploadOptions, OSSUploadLocalItem } from '../types';

class COSClient extends Client<Partial<COS.COSOptions>, COS.SliceUploadFileParams> {
  #client!: COS;

  constructor(options: OSSUploadOptions) {
    super(options);
    this.#client = new COS({
      ...this.globalOptions,
      ...this.opt?.COSOptions,
    });
  }

  async upload(item: OSSUploadLocalItem, params?: Partial<COS.SliceUploadFileParams>) {
    const { start, process, success, fail } = createUploadSpinner(item.filePath, item.path);
    try {
      start();
      const res = await this.#client.sliceUploadFile({
        FilePath: item.filePath,
        Key: item.path,
        onProgress(info) {
          process(info.loaded, info.total, info.speed);
        },
        ...this.globalUploadParams,
        ...params,
      } as COS.SliceUploadFileParams);
      const { statusCode } = res;
      if (!isStatusCodeOK(statusCode!)) {
        fail();
        return Promise.reject(res);
      }
      success(!REG_URI.test(res.Location) ? `http://${res.Location}` : res.Location);
      return res;
    } catch (e) {
      fail(e?.message || e);
      return Promise.reject(e);
    }
  }

  async uploadBuffer(
    buffer: Buffer | string,
    path: string,
    filePath?: string,
    params?: Partial<COS.PutObjectParams> | undefined,
  ): Promise<any> {
    const { start, process, success, fail } = createUploadSpinner(`buffer:${filePath}`, path);
    try {
      start();
      const res = await this.#client.putObject({
        Body: buffer,
        Key: path,
        onProgress(info) {
          process(info.loaded, info.total, info.speed);
        },
        ...this.globalUploadParams,
        ...params,
      } as COS.PutObjectParams);
      const { statusCode } = res;
      if (!isStatusCodeOK(statusCode!)) {
        fail();
        return Promise.reject(res);
      }
      success(!REG_URI.test(res.Location) ? `http://${res.Location}` : res.Location);
      return res;
    } catch (e) {
      fail(e?.message || e);
      return Promise.reject(e);
    }
  }

  get globalOptions() {
    const SecretId = getGlobalValue(COS_SECRET_ID, SECRET_ID);
    const SecretKey = getGlobalValue(COS_SECRET_KEY, SECRET_KEY);
    return {
      SecretId,
      SecretKey,
    };
  }

  get globalUploadParams() {
    return {
      Bucket: getGlobalValue(COS_BUCKET_KEY, BUCKET_KEY),
      Region: getGlobalValue(COS_REGION_KEY, REGION_KEY),
    };
  }
}

export default COSClient;
