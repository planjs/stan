import { getRemoteFileInfo } from '../src/utils';

describe('utils', () => {
  it('getRemoteFileInfo', async () => {
    const res = await getRemoteFileInfo(
      'https://avatars.githubusercontent.com/u/44866728?s=200&v=4',
    );
    expect(typeof res.body).toBe('string');
  }, 5000);

  it('getRemoteFileInfo ali-oss', async () => {
    try {
      const res = await getRemoteFileInfo(
        'https://pkg.aquanliang.com/microfrontends.app/npm.importmap.json',
      );
      expect(typeof res.body).toBe('string');
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });

  it('getRemoteFileInfo failed', async () => {
    try {
      const res = await getRemoteFileInfo('http://xxxx/index.d.ts');
      expect(typeof res.body).toBe('string');
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
});
