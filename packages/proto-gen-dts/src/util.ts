import { prettier } from 'stan-utils';

/**
 * prettier format ts content
 * @param content
 * @param opts
 */
export function formatTS(content: string, opts?: prettier.Options) {
  const prettierFormatOpts: prettier.Options = {
    ...opts,
    parser: 'typescript',
  };

  // read project prettier config
  const prettierrc = prettier.resolveConfigFile.sync();
  if (prettierrc) {
    Object.assign(prettierrc, prettier.resolveConfig.sync(prettierrc));
  }

  return prettier.format(content, prettierFormatOpts);
}
