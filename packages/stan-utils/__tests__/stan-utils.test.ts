import { slash } from '../src';

describe('stan-utils', () => {
  it('test slash', () => {
    expect(slash('src\\index.ts')).toBe('src/index.ts');
  });
});
