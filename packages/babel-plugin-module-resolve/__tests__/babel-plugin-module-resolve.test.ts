import path from 'path';
import fs from 'fs';
import execa from 'execa';

describe('babel-plugin-module-resolve', () => {
  const fixturesDir = path.join(__dirname, '../__fixtures__');
  const fixtures = fs.readdirSync(fixturesDir);
  fixtures.forEach((fixture) => {
    it(`test ${fixture}`, () => {
      const cwd = path.join(fixturesDir, fixture);
      execa.sync('babel', ['src', '-d', 'lib'], { cwd });
      expect(require(path.join(cwd, 'lib'))).toEqual(`You passed [${fixture}]`);
    });
  });
});
