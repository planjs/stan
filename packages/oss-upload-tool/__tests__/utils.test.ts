import { checkOSSFileExits } from '../src/utils';

describe('utils', () => {
  it('checkOSSFileExits', async () => {
    const res = await checkOSSFileExits(
      'https://avatars.githubusercontent.com/u/44866728?s=200&v=4',
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
      expect(e).not.toBeDefined();
    }
  });

  it('checkOSSFileExits failed', async () => {
    try {
      const res = await checkOSSFileExits('http://xxxx/index.d.ts');
      expect(typeof res).toBe('string');
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });
});
