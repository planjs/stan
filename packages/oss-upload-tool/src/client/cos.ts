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
  UPLOAD_TIMEOUT_KEY,
  DEFAULT_TIMEOUT,
} from '../consts';
import type { OSSUploadOptions, OSSUploadLocalItem } from '../types';

class COSClient extends Client<Partial<COS.COSOptions>, COS.UploadFileParams> {
  #client!: COS;

  constructor(options: OSSUploadOptions) {
    super(options);
    this.#client = new COS({
      ProgressInterval: 100,
      ...this.globalOptions,
      ...this.opt?.COSOptions,
      ...(options.timeout ? { Timeout: options.timeout } : {}),
    });
  }

  async upload(
    item: OSSUploadLocalItem,
    params?: Partial<COS.UploadFileParams>,
    options?: UploadOptions,
  ) {
    try {
      const res = await this.#client.uploadFile({
        FilePath: item.filePath,
        Key: item.path,
        SliceSize: 1024 * 1024 * 5,
        onProgress(info) {
          options?.onProgress?.(info.loaded, info.total, info.speed);
        },
        ...this.globalUploadParams,
        ...params,
      } as COS.UploadFileParams);
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
    const Timeout = getGlobalValue(UPLOAD_TIMEOUT_KEY);
    return {
      SecretId,
      SecretKey,
      Timeout: Number.isNaN(+Timeout!) ? DEFAULT_TIMEOUT : +Timeout!,
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
