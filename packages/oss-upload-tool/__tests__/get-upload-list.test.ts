import path from 'path';
import getUploadList from '../src/get-upload-list';
import { expect } from '@jest/globals';

const cwd = path.join(__dirname, 'files');
const inputFiles = ['a.js', 'b/b.js'];

describe('oss-upload-tool', () => {
  it('get-upload-list', () => {
    for (const [index, output] of Object.entries(getUploadList(inputFiles, 'output', { cwd }))) {
      expect(output.path).toBe(`output/${inputFiles[index]}`);
      expect(output.filePath).toBe(path.join(cwd, inputFiles[index]));
    }

    // if dir
    expect(getUploadList(['b/'], 'output', { cwd }).length).toBe(0);
  });

  it('get-upload-list flatten', () => {
    for (const [index, output] of Object.entries(
      getUploadList(inputFiles, 'output', { cwd, flatten: true }),
    )) {
      expect(output.path).toBe(`output/${path.parse(inputFiles[index]).base}`);
      expect(output.filePath).toBe(path.join(cwd, inputFiles[index]));
    }
  });

  it('get-upload-list rename', () => {
    for (const [index, output] of Object.entries(
      getUploadList(inputFiles, 'output', {
        cwd,
        rename: (file) => {
          return file + '.ts';
        },
      }),
    )) {
      expect(output.path).toBe(`output/${inputFiles[index].replace('.js', '.ts')}`);
      expect(output.filePath).toBe(path.join(cwd, inputFiles[index]));
    }
  });
});
