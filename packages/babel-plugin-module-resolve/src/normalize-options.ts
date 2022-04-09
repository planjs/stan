import fs from 'fs';
import path from 'path';
import os from 'os';

import type { ResolveOptions } from 'enhanced-resolve';
import { CachedInputFileSystem } from 'enhanced-resolve';

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
    const ts = require('typescript');
    const result = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    const formatDiagnosticHost = {
      getCanonicalFileName: (fileName: string) => fileName,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => os.EOL,
    };
    if (result?.error) {
      console.log(ts.formatDiagnostic(result.error, formatDiagnosticHost));
    } else {
      const parsed = ts.parseJsonConfigFileContent(
        result.config,
        {
          useCaseSensitiveFileNames: false,
          readDirectory: ts.sys.readDirectory,
          fileExists: ts.sys.fileExists,
          readFile: ts.sys.readFile,
        },
        path.dirname(tsConfigPath),
      );
      if (parsed?.errors?.length) {
        console.log(ts.formatDiagnostic(parsed?.errors?.[0], formatDiagnosticHost));
      } else {
        config = {
          compilerOptions: {
            ...parsed.options,
          },
        };
      }
    }
  } else if (hasJsConfig) {
    config = require(jsConfigPath);
  }

  const options = config?.compilerOptions || {};

  if (!options.baseUrl) {
    return {};
  }

  const baseUrl = path.resolve(this.cwd, options.baseUrl);

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
    baseUrl,
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
    fileSystem: new CachedInputFileSystem(fs),
    ...this.opts,
    alias,
  };
}

export default normalizeOptions;
