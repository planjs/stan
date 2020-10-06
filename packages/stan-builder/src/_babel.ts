import path from 'path';
import fs from 'fs';
import { transformSync } from '@babel/core';
import vfs from 'vinyl-fs';
import File from 'vinyl';
import through from 'through2';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import gulpTs from 'gulp-typescript';
import terser from 'gulp-terser';
import filter from 'gulp-filter';
import { readConfigFile } from 'typescript';
import { signale, chalk, slash, chokidar, rimraf, lodash } from 'stan-utils';
import merge from 'merge2';
import getBabelConfig from './get-babel-config';

import { BundleOptions, CJSOptions } from './types';

export interface BabelOptions {
  cwd: string;
  rootPath?: string;
  type: 'esm' | 'cjs';
  target?: 'browser' | 'node';
  watch?: boolean;
  bundleOpt: BundleOptions;
}

interface TransformOpts {
  file: {
    contents: string;
    path: string;
  };
  type: 'esm' | 'cjs';
}

export default async function babelBuild(opts: BabelOptions) {
  const {
    cwd,
    rootPath,
    type,
    watch = false,
    bundleOpt: {
      entry,
      target = 'browser',
      minify = false,
      runtimeHelpers,
      extraBabelPresets = [],
      extraBabelPlugins = [],
      disableTypeCheck,
      sourcemap,
      cjs,
    },
  } = opts;
  const srcPath = path.parse(path.join(cwd, entry!)).dir;
  const targetDir = type === 'esm' ? 'es' : 'lib';
  const targetPath = path.join(cwd, targetDir);

  function babelTransform(opts: TransformOpts) {
    const { file, type } = opts;
    const babelOpts = getBabelConfig({
      target,
      type,
      typescript: true,
      runtimeHelpers,
      lazy: cjs && (cjs as CJSOptions)?.lazy,
    });
    babelOpts.presets.push(...extraBabelPresets);
    babelOpts.plugins.push(...extraBabelPlugins);
    console.log(`Transform ${chalk.green(slash(file.path).replace(`${cwd}/`, ''))} to ${type}`);
    return transformSync(file.contents, {
      ...babelOpts,
      filename: file.path,
      configFile: false,
    })?.code;
  }

  function getTSConfig() {
    function parseTsconfig(path: string) {
      const readFile = (path: string) => fs.readFileSync(path, 'utf-8');
      const result = readConfigFile(path, readFile);
      if (result.error) {
        return;
      }
      return result.config;
    }

    function getTsconfigCompilerOptions(path: string) {
      const config = parseTsconfig(path);
      return config ? config.compilerOptions : undefined;
    }

    const tsconfigPath = path.join(cwd, 'tsconfig.json');
    const templateTsconfigPath = path.join(__dirname, '../template/tsconfig.json');

    if (fs.existsSync(tsconfigPath)) {
      return getTsconfigCompilerOptions(tsconfigPath) || {};
    }
    if (rootPath && fs.existsSync(path.join(rootPath, 'tsconfig.json'))) {
      return getTsconfigCompilerOptions(path.join(rootPath, 'tsconfig.json')) || {};
    }
    return getTsconfigCompilerOptions(templateTsconfigPath) || {};
  }

  const tsConfig = getTSConfig();

  function createStream(globs: string[] | string) {
    const babelTransformRegexp = /\.(t|j)sx?$/;

    function isTsFile(path: string) {
      return /\.tsx?$/.test(path) && !path.endsWith('.d.ts');
    }

    function isTransform(path: string) {
      return babelTransformRegexp.test(path) && !path.endsWith('.d.ts');
    }

    const jsFilter = filter('**/*.js', { restore: true });

    const main = vfs
      .src(globs, {
        allowEmpty: true,
        base: srcPath,
      })
      .pipe(gulpIf(() => watch, plumber()))
      .pipe(sourcemap ? sourcemaps.init() : through.obj())
      .pipe(
        gulpIf(
          (f: File) => isTransform(f.path),
          through.obj((file, enc, cb) => {
            try {
              file.contents = Buffer.from(
                babelTransform({
                  file,
                  type,
                })!,
              );
              file.path = file.path.replace(path.extname(file.path), '.js');
              cb(null, file);
            } catch (e) {
              signale.error(`Compiled failed: ${file.path}`);
              console.log(e);
              cb(null);
            }
          }),
        ),
      )
      .pipe(sourcemap ? sourcemaps.write('.') : through.obj())
      .pipe(vfs.dest(targetPath));

    if (minify) {
      main
        .pipe(jsFilter)
        .pipe(terser())
        .pipe(
          through.obj((file, enc, cb) => {
            file.path = file.path.replace(path.extname(file.path), '.min.js');
            cb(null, file);
          }),
        )
        .pipe(sourcemaps.write('.'))
        .pipe(vfs.dest(targetPath));
    }

    const ts = vfs
      .src(globs, {
        allowEmpty: true,
        base: srcPath,
      })
      .pipe(gulpIf(() => watch, plumber()))
      .pipe(
        gulpIf(
          (f: File) => isTsFile(f.path),
          gulpTs({
            ...tsConfig,
            emitDeclarationOnly: true,
            noEmit: !tsConfig?.declaration,
            noEmitOnError: disableTypeCheck,
          }),
        ),
      )
      .pipe(
        vfs.dest(tsConfig?.declarationDir ? path.join(cwd, tsConfig.declarationDir) : targetDir),
      );

    return merge(main, ts);
  }

  // clear typing dir
  if (tsConfig?.declaration && tsConfig?.declarationDir) {
    rimraf.sync(path.join(cwd, tsConfig?.declarationDir));
  }

  return new Promise((resolve) => {
    const patterns = [
      path.join(srcPath, '**/*'),
      `!${path.join(srcPath, '**/demos{,/**}')}`,
      `!${path.join(srcPath, '**/__test__{,/**}')}`,
      `!${path.join(srcPath, '**/*.mdx')}`,
      `!${path.join(srcPath, '**/*.md')}`,
      `!${path.join(srcPath, '**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)')}`,
    ];
    createStream(patterns).on('queueDrain', () => {
      if (watch) {
        // 后面改改，可以一个地方统一监听
        const watcher = chokidar.watch(patterns, {
          ignoreInitial: true,
        });

        const files: string[] = [];
        function compileFiles() {
          while (files.length) {
            createStream(files.pop()!);
          }
        }
        const debouncedCompileFiles = lodash.debounce(compileFiles, 1000);

        watcher.on('all', (event, fullPath) => {
          const relPath = fullPath.replace(srcPath, '');
          console.log(`[${event}] ${slash(path.join(srcPath, relPath)).replace(`${cwd}/`, '')}`);
          if (!fs.existsSync(fullPath)) return;
          if (fs.statSync(fullPath).isFile()) {
            if (!files.includes(fullPath)) files.push(fullPath);
            debouncedCompileFiles();
          }
        });

        process.once('SIGINT', () => {
          watcher.close();
        });
      }
      resolve();
    });
  });
}
