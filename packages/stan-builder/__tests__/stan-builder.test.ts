import * as path from 'path';
import * as fs from 'fs';

import stanLibBuilder from '../src';

const dirs = (p: string, isFullPath = false) =>
  fs
    .readdirSync(p)
    .filter((f) => fs.statSync(path.join(p, f)).isDirectory())
    .map((v) => (isFullPath ? path.join(p, v) : v));

jest.useFakeTimers();
jest.setTimeout(10000);

it('stan-builder build', async () => {
  try {
    for (let cwd of dirs(path.join(__dirname, '../fixtures'), true)) {
      await stanLibBuilder({ cwd });
    }
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }
});
