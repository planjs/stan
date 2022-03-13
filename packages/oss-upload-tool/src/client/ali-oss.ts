import AOSS from 'ali-oss';

import { Client } from '../oss_client';
import { isStatusCodeOK, createUploadSpinner, getGlobalValue } from '../utils';
import {
  ALIOSS_BUCKET_KEY,
  ALIOSS_ENDPOINT_KEY,
  ALIOSS_REGION_KEY,
  ALIOSS_SECRET_ID,
  ALIOSS_SECRET_KEY,
  BUCKET_KEY,
  REGION_KEY,
  SECRET_ID,
  SECRET_KEY,
} from '../consts';
import type { OSSUploadOptions, OSSUploadLocalItem } from '../types';

class AOSSClient extends Client<Partial<AOSS.Options>, AOSS.PutObjectOptions> {
  #client!: AOSS;

  constructor(options: OSSUploadOptions) {
    super(options);
    this.#client = new AOSS({
      ...this.globalOptions,
      ...this.opt?.AOSSOptions!,
    });
  }

  async upload(item: OSSUploadLocalItem, params?: Partial<AOSS.PutObjectOptions>) {
    const { start, success, fail } = createUploadSpinner(item.filePath, item.path);
    try {
      start();
      const { res, url } = await this.#client.put(item.path, item.content || item.filePath, params);
      if (!isStatusCodeOK(res.status)) {
        fail();
        return Promise.reject(res);
      }
      success(url);
      return res;
    } catch (e) {
      fail(e?.message || e);
      return Promise.reject(e);
    }
  }

  get globalOptions() {
    return {
      accessKeyId: getGlobalValue(ALIOSS_SECRET_ID, SECRET_ID),
      accessKeySecret: getGlobalValue(ALIOSS_SECRET_KEY, SECRET_KEY),
      bucket: getGlobalValue(ALIOSS_BUCKET_KEY, BUCKET_KEY),
      region: getGlobalValue(ALIOSS_REGION_KEY, REGION_KEY),
      endpoint: getGlobalValue(ALIOSS_ENDPOINT_KEY),
    };
  }

  get globalUploadParams() {
    return {};
  }
}

export default AOSSClient;
