import validOptions from '../src/valid-options';
import { BundleOptions } from '../src';

const successValidates: Partial<Record<keyof BundleOptions, any[]>> = {
  entry: ['src/index.ts'],
  target: ['node', 'browser'],
  extraBabelPlugins: [[]],
  extraBabelPresets: [[]],
};

it('valid-options', () => {
  for (let k in successValidates) {
    successValidates[k].forEach((v: any) => {
      expect(
        validOptions.validate({
          [k]: v,
        }).error,
      ).toBe(undefined);
    });
  }
});
