import { URL } from 'url';

import AOSS from 'ali-oss';
import { lodash } from 'stan-utils';

import { Client } from '../oss_client';
import type { UploadResp, UploadOptions } from '../oss_client';
import type { OSSUploadOptions, OSSUploadLocalItem } from '../types';
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

class ALIClient extends Client<Partial<AOSS.Options>, AOSS.PutObjectOptions> {
  readonly #client!: AOSS;

  constructor(options: OSSUploadOptions) {
    super(options);
    this.#client = new AOSS(lodash.defaultsDeep(this.globalOptions, this.opt?.ALIOptions!));
  }

  upload = async (
    item: OSSUploadLocalItem,
    params?: Partial<AOSS.PutObjectOptions>,
    options?: UploadOptions,
  ): Promise<UploadResp> => {
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
  };

  getUploadedUrl = async (item: OSSUploadLocalItem, params?: Partial<AOSS.PutObjectOptions>) => {
    const uri = new URL(
      this.opt?.origin ||
        `http://${this.opt?.ALIOptions?.bucket || this.globalOptions.bucket}.${this.globalOptions
          .endpoint!}`,
    );
    uri.pathname = item.path;
    return {
      url: uri.href,
    };
  };

  // https://sscan.oss-cn-shanghai.aliyuncs.com/latest.yml

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

  get client() {
    return this.#client;
  }
}

export default ALIClient;
