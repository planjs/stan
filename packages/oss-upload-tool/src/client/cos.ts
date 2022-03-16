import COS from 'cos-nodejs-sdk-v5';
import { REG_URI } from '@planjs/utils';

import { Client, UploadOptions } from '../oss_client';
import { isStatusCodeOK, getGlobalValue } from '../utils';
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

  async upload(
    item: OSSUploadLocalItem,
    params?: Partial<COS.SliceUploadFileParams>,
    options?: UploadOptions,
  ) {
    try {
      const res = await this.#client.sliceUploadFile({
        FilePath: item.filePath,
        Key: item.path,
        onProgress(info) {
          options?.onProgress?.(info.loaded, info.total, info.speed);
        },
        ...this.globalUploadParams,
        ...params,
      } as COS.SliceUploadFileParams);
      const { statusCode } = res;
      if (!isStatusCodeOK(statusCode!)) {
        return Promise.reject(res);
      }
      return {
        url: !REG_URI.test(res.Location) ? `http://${res.Location}` : res.Location,
      };
    } catch (e) {
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
