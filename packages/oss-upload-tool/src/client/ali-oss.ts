import AOSS from 'ali-oss';

import { Client, UploadOptions } from '../oss_client';
import { isStatusCodeOK, getGlobalValue, defaultVal } from '../utils';
import {
  ALIOSS_BUCKET_KEY,
  ALIOSS_ENDPOINT_KEY,
  ALIOSS_REGION_KEY,
  ALIOSS_SECRET_ID,
  ALIOSS_SECRET_KEY,
  BUCKET_KEY,
  DEFAULT_TIMEOUT,
  REGION_KEY,
  SECRET_ID,
  SECRET_KEY,
  UPLOAD_TIMEOUT_KEY,
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

  async upload(
    item: OSSUploadLocalItem,
    params?: Partial<AOSS.PutObjectOptions>,
    options?: UploadOptions,
  ) {
    try {
      const { res, url } = await this.#client.put(item.path, item.content || item.filePath, {
        ...this.globalUploadParams,
        ...params,
      });
      if (!isStatusCodeOK(res.status)) {
        return Promise.reject(res);
      }
      return {
        url,
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  get globalOptions() {
    const timeout = getGlobalValue(UPLOAD_TIMEOUT_KEY);
    return {
      accessKeyId: getGlobalValue(ALIOSS_SECRET_ID, SECRET_ID),
      accessKeySecret: getGlobalValue(ALIOSS_SECRET_KEY, SECRET_KEY),
      bucket: getGlobalValue(ALIOSS_BUCKET_KEY, BUCKET_KEY),
      region: getGlobalValue(ALIOSS_REGION_KEY, REGION_KEY),
      endpoint: getGlobalValue(ALIOSS_ENDPOINT_KEY),
      timeout: Number.isNaN(+timeout!) ? defaultVal(this.opt.timeout, DEFAULT_TIMEOUT) : +timeout!,
    };
  }

  get globalUploadParams() {
    return {};
  }
}

export default AOSSClient;
