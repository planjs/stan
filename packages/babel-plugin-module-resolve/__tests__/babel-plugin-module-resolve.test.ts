import * as path from 'path';
import * as fs from 'fs';
import * as shell from 'shelljs';

describe('babel-plugin-module-resolve', () => {
  const fixturesDir = path.join(__dirname, '../__fixtures__');
  const fixtures = fs
    .readdirSync(fixturesDir)
    .filter((v) => fs.statSync(path.join(fixturesDir, v)).isDirectory());

  fixtures.forEach((fixture) => {
    it(`test ${fixture}`, () => {
      const cwd = path.join(fixturesDir, fixture);
      shell.rm('-rf', path.join(cwd, 'lib'));
      const { code, stdout } = shell.cd(cwd).exec('babel src -d lib -x ".ts,.js" --verbose', {
        cwd,
      });
      console.log(stdout);
      expect(code).toBe(0);
      expect(require(path.join(cwd, 'lib')).default).toEqual(`You passed [${fixture}]`);
    });
  });
});
