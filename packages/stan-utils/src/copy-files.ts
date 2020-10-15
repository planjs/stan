import path from 'path';
import util from 'util';
import globby from 'globby';
import fs from 'fs-extra';
import chalk from 'chalk';
import isObject from './is-plain-object';

export interface CopyTarget extends Omit<globby.GlobbyOptions, 'transform'> {
  /**
   * 文件 globby 匹配
   */
  src: string | string[];
  /**
   * 输出目录
   */
  dest: string | string[];
  /**
   * 更改输出文件名
   */
  rename?: ((path: string, ext: string) => string) | string;
  /**
   * 更改输出文件内容
   * @param content
   */
  transform?: (content: string | ArrayBuffer) => string | ArrayBuffer;
}

export type CopyOptions = {
  targets?: CopyTarget[] | CopyTarget;
  /**
   * 删除复制文件的目录结构
   * @default true
   */
  flatten?: boolean;
  /**
   * 日志
   */
  verbose?: boolean;
};

function stringify(value: any) {
  return util.inspect(value, { breakLength: Infinity });
}

async function isFile(filePath: string): Promise<boolean> {
  const fileStats = await fs.stat(filePath);

  return fileStats.isFile();
}

function renameTarget(target: string, rename: CopyTarget['rename']) {
  const parsedPath = path.parse(target);

  return typeof rename === 'string' ? rename : rename!(parsedPath.name, parsedPath.ext.slice(1));
}

async function generateCopyTarget(
  src: string,
  dest: string,
  {
    flatten,
    rename,
    transform,
  }: Pick<CopyTarget, 'rename' | 'transform'> & Pick<CopyOptions, 'flatten'>,
): Promise<
  {
    src: string;
    dest: string;
    contents?: string | ArrayBuffer;
  } & Pick<CopyTarget, 'transform' | 'rename'>
> {
  if (transform && !(await isFile(src as string))) {
    throw new Error(`"transform" option works only on files: '${src}' must be a file`);
  }

  const { base, dir } = path.parse(src as string);
  const destinationFolder =
    flatten || (!flatten && !dir) ? dest : dir.replace(dir.split('/')[0], dest);

  return {
    src,
    dest: path.join(destinationFolder, rename ? renameTarget(base, rename) : base),
    ...(transform && { contents: await transform(await fs.readFile(src)) }),
    rename,
    transform,
  };
}

export default async function copyFiles(options: CopyOptions = {}) {
  const { flatten = true, targets, verbose = false, ...opts } = options;

  const copyTargets = [];
  const _targets: CopyTarget[] = Array.isArray(targets)
    ? targets
    : isObject(targets)
    ? [targets!]
    : [];
  if (_targets.length) {
    for (const target of _targets) {
      if (!isObject(target)) {
        throw new Error(`${stringify(target)} target must be an object`);
      }

      const { dest, rename, src, transform, ...tar } = target;

      if (!src || !dest) {
        throw new Error(`${stringify(target)} target must have "src" and "dest" properties`);
      }

      if (rename && typeof rename !== 'string' && typeof rename !== 'function') {
        throw new Error(
          `${stringify(target)} target's "rename" property must be a string or a function`,
        );
      }

      const matchedPaths = await globby(src, {
        expandDirectories: false,
        onlyFiles: false,
        ...opts,
        ...tar,
      });

      if (matchedPaths.length) {
        for (const matchedPath of matchedPaths) {
          const generatedCopyTargets = Array.isArray(dest)
            ? await Promise.all(
                dest.map((destination) =>
                  generateCopyTarget(matchedPath, destination, { flatten, rename, transform }),
                ),
              )
            : [await generateCopyTarget(matchedPath, dest, { flatten, rename, transform })];

          copyTargets.push(...generatedCopyTargets);
        }
      }
    }
  }

  if (copyTargets.length) {
    for (const copyTarget of copyTargets) {
      const { contents, dest, src } = copyTarget;

      if (contents) {
        await fs.outputFile(dest, contents, opts);
      } else {
        await fs.copy(src as string, dest, opts);
      }

      if (verbose) {
        let message = chalk.green(`  copied: ${chalk.bold(src)} → ${chalk.bold(dest)}`);
        const flags = Object.entries(copyTarget)
          .filter(([key, value]) => ['rename', 'transform'].includes(key) && value)
          .map(([key]) => key.charAt(0).toUpperCase());

        if (flags.length) {
          message = `${message} ${chalk.yellow(`[${flags.join(', ')}]`)}`;
        }

        process.stdout.write(message);
      }
    }
  } else {
    console.log(chalk.yellow('no items to copy'));
  }
}
