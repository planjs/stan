import fs from 'fs';
import crypto from 'crypto';
import type { BinaryLike } from 'crypto';

function md5(contents: string | BinaryLike): string {
  return crypto.createHash('md5').update(contents).digest('hex');
}

/**
 * @see https://github.com/badsyntax/s3-etag/blob/master/src/s3Etag.ts
 * @param filePath
 * @param partSizeInBytes
 */
function getFileEtag(filePath: string, partSizeInBytes = 0): string {
  if (partSizeInBytes === 0) {
    return md5(fs.readFileSync(filePath));
  }
  const { size: fileSizeInBytes } = fs.statSync(filePath);
  let parts = Math.floor(fileSizeInBytes / partSizeInBytes);
  if (fileSizeInBytes % partSizeInBytes > 0) {
    parts += 1;
  }
  const fileDescriptor = fs.openSync(filePath, 'r');
  let totalMd5 = '';

  for (let part = 0; part < parts; part++) {
    const skipBytes = partSizeInBytes * part;
    const totalBytesLeft = fileSizeInBytes - skipBytes;
    const bytesToRead = Math.min(totalBytesLeft, partSizeInBytes);
    const buffer = Buffer.alloc(bytesToRead);
    fs.readSync(fileDescriptor, buffer, 0, bytesToRead, skipBytes);
    totalMd5 += md5(buffer);
  }

  const combinedHash = md5(Buffer.from(totalMd5, 'hex'));
  return `${combinedHash}-${parts}`;
}

export default getFileEtag;
