import fs from 'fs';
import path from 'path';
import resolve from 'resolve';
import { CachedInputFileSystem } from 'enhanced-resolve';

import type { ResolveOptions } from 'enhanced-resolve';

import type { ModuleResolveOptions, AliasOptions, TSConfigType } from './types';
import type { PluginContext } from './ctx';

const defaultExtensions = ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'];

function getAdditionalModulePaths(this: PluginContext): {
  baseUrl?: string;
  alias?: AliasOptions;
} {
  const tsConfigPath = path.join(this.cwd, 'tsconfig.json');
  const jsConfigPath = path.join(this.cwd, 'jsconfig.json');

  let config: TSConfigType;
  const hasTsConfig = fs.existsSync(tsConfigPath);
  const hasJsConfig = fs.existsSync(jsConfigPath);

  if (hasTsConfig) {
    const ts = require(resolve.sync('typescript', {
      basedir: this.cwd,
    }));
    config = ts.readConfigFile(tsConfigPath, ts.sys.readFile).config;
  } else if (hasJsConfig) {
    config = require(jsConfigPath);
  }

  const options = config?.compilerOptions || {};

  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const paths = options.paths || {};
  const alias = {};

  for (const key in paths) {
    const val = paths[key];
    const k = key.replace('/*', '');
    if (typeof val === 'string') {
      alias[k] = path.resolve(baseUrl, val).replace('/*', '');
    }
    if (Array.isArray(val)) {
      alias[k] = val.map((v) => path.resolve(baseUrl, v).replace('/*', ''));
    }
  }

  return {
    baseUrl: path.resolve(this.cwd, baseUrl),
    alias,
  };
}

function normalizeOptions(this: PluginContext): ModuleResolveOptions {
  const opts = (this.opts || {}) as ResolveOptions;

  const { baseUrl, alias: _alias } = getAdditionalModulePaths.call(this);

  const alias = opts.alias ||
    _alias || {
      '@': path.join(this.cwd),
    };

  return {
    roots: [this.cwd, baseUrl],
    extensions: defaultExtensions,
    ...this.opts,
    fileSystem: new CachedInputFileSystem(fs, 4000),
    alias,
  };
}

export default normalizeOptions;
