import { checkOSSFileExits } from '../src/utils';

describe('utils', () => {
  it('checkOSSFileExits', async () => {
    const res = await checkOSSFileExits(
      'https://quan-admin-web-1259287960.cos.ap-guangzhou.myqcloud.com/logo.png',
    );
    expect(typeof res).toBe('string');
  }, 5000);

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
