import { checkOSSFileExits } from '../src/utils';

describe('utils', () => {
  it('checkOSSFileExits', async () => {
    const res = await checkOSSFileExits('https://www.baidu.com');
    expect(typeof res).toBe('string');
  });

  it('checkOSSFileExits ali-oss', async () => {
    try {
      const res = await checkOSSFileExits(
        'http://oss-cn-shanghai.aliyuncs.com/__test__/get-upload-list.d.ts',
      );
      expect(typeof res).toBe('string');
    } catch (e) {
      expect(e).not.toBeNaN();
    }
  });

  it('checkOSSFileExits failed', async () => {
    try {
      const res = await checkOSSFileExits('http://xxxx/index.d.ts');
      expect(typeof res).toBe('string');
    } catch (e) {
      expect(e).not.toBeNaN();
    }
  });
});
