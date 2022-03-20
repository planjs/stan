import * as path from 'path';
import * as fs from 'fs';

import stanLibBuilder from '../src';

const dirs = (p: string, isFullPath = false) =>
  fs
    .readdirSync(p)
    .filter((f) => fs.statSync(path.join(p, f)).isDirectory())
    .map((v) => (isFullPath ? path.join(p, v) : v));

const fixtures = dirs(path.join(__dirname, '../__fixtures__'), true);

for (const cwd of fixtures) {
  test(`test ${path.basename(cwd)} build`, async () => {
    await stanLibBuilder({ cwd });
  }, 30000);
}
