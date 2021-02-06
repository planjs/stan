import * as path from 'path';
import * as fs from 'fs';

import stanLibBuilder from '../src';

const dirs = (p: string, isFullPath = false) =>
  fs
    .readdirSync(p)
    .filter((f) => fs.statSync(path.join(p, f)).isDirectory())
    .map((v) => (isFullPath ? path.join(p, v) : v));

jest.useFakeTimers();

it('stan-builder build', async () => {
  const fixtures = dirs(path.join(__dirname, '../fixtures'), true);
  for (let cwd of fixtures) {
    await stanLibBuilder({ cwd });
  }
}, 30000);
