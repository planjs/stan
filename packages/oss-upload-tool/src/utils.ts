import http, { IncomingHttpHeaders } from 'http';
import https from 'https';

import { execa } from 'stan-utils';
import { convertObjectKeysCase } from '@planjs/utils';

export function isStatusCodeOK(code: number) {
  return code >= 200 && code <= 300;
}

export function getGlobalValue(...keys: string[]): string | undefined {
  for (const key of keys) {
    const val = process.env[key] || execa.sync('npm', ['config', 'get', key]).stdout;
    if (val && val !== 'undefined') {
      return val;
    }
  }
  return undefined;
}

export function safeSetEnv(k: string, v: string, f = false) {
  if (v && !f) {
    process.env[k] = v;
  }
}

export function defaultVal<T>(v: T | undefined, d: T) {
  if (v !== undefined) return v;
  return d;
}

export function getRemoteFileInfo(url: string) {
  const request = url.startsWith('https:') ? https : http;
  return new Promise<{
    body: string;
    headers: IncomingHttpHeaders;
    etag?: string;
  }>((resolve, reject) => {
    request
      .get(url, (res) => {
        let body = '';
        res.on('data', (data) => {
          body += data;
        });
        res.on('end', () => {
          if (isStatusCodeOK(res.statusCode!)) {
            const headers = convertObjectKeysCase(res.headers! || {});
            let etag = headers['etag'] || headers['if-none-match'];
            if (etag && typeof etag === 'string') {
              etag = etag.toLowerCase();
            }
            resolve({
              body,
              headers,
              etag,
            });
          } else {
            reject(res);
          }
        });
      })
      .on('error', (e) => {
        reject(e.message);
      });
  });
}
