import * as path from 'path';
import * as fs from 'fs';

import protoGenDTS from '../src';

const files = (p: string, isFullPath = false) =>
  fs
    .readdirSync(p)
    .filter((f) => fs.statSync(path.join(p, f)).isFile())
    .map((v) => (isFullPath ? path.join(p, v) : v));

jest.useFakeTimers();

const fixtureDir = path.join(__dirname, '../fixtures');

describe('proto-gen-dts', () => {
  it('generate dts', () => {
    const fixtures = files(fixtureDir, true).filter((v) => /\.proto$/.test(v));
    const parsedFiles = protoGenDTS({
      files: fixtures.map((file) => ({ file })),
      referenceEntryFile: path.join(fixtureDir, 'index.d.ts'),
    });
    expect(parsedFiles.every((v) => fs.existsSync(v))).toBe(true);
  });
});
