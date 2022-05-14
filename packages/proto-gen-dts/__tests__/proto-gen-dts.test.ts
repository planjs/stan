import path from 'path';
import fs from 'fs';

import protoGenDTS from '../src';

const files = (p: string, isFullPath = false) =>
  fs
    .readdirSync(p)
    .filter((f) => fs.statSync(path.join(p, f)).isFile())
    .map((v) => (isFullPath ? path.join(p, v) : v));

const fixtureDir = path.join(__dirname, '../__fixtures__');
const expectedDir = 'expected';

describe('proto-gen-dts', () => {
  it('generate dts', () => {
    const fixtures = files(fixtureDir, true).filter((v) => /\.proto$/.test(v));
    const parsedFiles = protoGenDTS({
      files: fixtures.map((file) => {
        const { dir, name } = path.parse(file);
        return { file, output: path.join(dir, expectedDir, name + '.d.ts') };
      }),
      referenceEntryFile: path.join(fixtureDir, expectedDir, 'index.d.ts'),
    });
    expect(parsedFiles.every((v) => fs.existsSync(v))).toBe(true);
  });
});
