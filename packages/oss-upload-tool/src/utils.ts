import { relative } from 'path';
import { ora, chalk, slash, execa } from 'stan-utils';

export function isStatusCodeOK(code: number) {
  return code >= 200 && code <= 300;
}

export function createUploadSpinner(filename: string, target: string) {
  const text = `Upload ${chalk.yellow(slash(relative(process.cwd(), filename)))} to ${chalk.green(
    target,
  )}`;
  const spinner = ora(text);
  return {
    spinner,
    start() {
      spinner.start();
    },
    process(loaded: number, total: number, speed: number) {
      spinner.text = text + ` ${((loaded / total) * 100).toFixed(2)}%`;
    },
    success(url: string) {
      spinner.succeed(text + ' successful' + ` -> ${chalk.greenBright(url)}`);
    },
    fail(e?: string) {
      spinner.fail(e);
    },
  };
}

export function getGlobalValue(...keys: string[]): string | undefined {
  for (const key of keys) {
    const val = process.env[key] || execa.sync('npm', ['config', 'get', key]).stdout;
    if (val && val !== 'undefined') {
      return val;
    }
  }
  return undefined;
}
