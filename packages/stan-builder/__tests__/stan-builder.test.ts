import * as path from 'path';

import stanLibBuilder from '../src';

it('stan-builder build', function () {
  stanLibBuilder({
    cwd: path.join(__dirname, '../fixtures'),
  });
});
