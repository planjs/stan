import { getRemoteFileInfo } from '../src/utils';

describe('utils', () => {
  it('getRemoteFileInfo', async () => {
    const res = await getRemoteFileInfo(
      'https://avatars.githubusercontent.com/u/44866728?s=200&v=4',
    );
    expect(typeof res).toBe('string');
  }, 5000);

  it('getRemoteFileInfo ali-oss', async () => {
    try {
      const res = await getRemoteFileInfo(
        'http://oss-cn-shanghai.aliyuncs.com/__test__/get-upload-list.d.ts',
      );
      expect(typeof res).toBe('string');
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('getRemoteFileInfo failed', async () => {
    try {
      const res = await getRemoteFileInfo('http://xxxx/index.d.ts');
      expect(typeof res).toBe('string');
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });
});
