import * as path from 'path';
import * as fs from 'fs';

import protoGenDTS from '../src';

const files = (p: string, isFullPath = false) =>
  fs
    .readdirSync(p)
    .filter((f) => fs.statSync(path.join(p, f)).isFile())
    .map((v) => (isFullPath ? path.join(p, v) : v));

jest.useFakeTimers();

describe('proto-gen-dts', () => {
  it('generate dts', () => {
    const fixtures = files(path.join(__dirname, '../fixtures'), true).filter((v) =>
      /\.proto$/.test(v),
    );
    const generatedFiles = protoGenDTS({
      files: fixtures.map((file) => ({ file })),
      referenceEntryFile: false,
    });
    expect(generatedFiles.every((v) => fs.existsSync(v))).toBe(true);
  });
});
