import { join } from 'path';
import { existsSync } from 'fs';
import { slash, copyFiles } from '../src';

describe('stan-utils', () => {
  it('test slash', () => {
    expect(slash('src\\index.ts')).toBe('src/index.ts');
  });

  it('test copyFiles', async () => {
    const dest = 'node_modules/__output__';
    await copyFiles({
      targets: {
        src: 'src/*.ts',
        dest,
      },
      verbose: true,
      flatten: false,
      cwd: join(__dirname, '..'),
    });
    expect(existsSync(join(__dirname, '../', dest, 'copy-files.ts'))).toBe(true);
  });
});
