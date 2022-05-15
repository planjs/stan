import { checkOSSFileExits } from '../src/utils';

describe('utils', () => {
  it('checkOSSFileExits', async () => {
    const res = await checkOSSFileExits(
      'http://quan-admin-web-1259287960.cos.ap-guangzhou.myqcloud.com/__test__/index.d.ts',
    );
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
