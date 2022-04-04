import fs from 'fs';
import path from 'path';
import { CachedInputFileSystem } from 'enhanced-resolve';

import type { ResolveOptions } from 'enhanced-resolve';

import type { ModuleResolveOptions } from './types';
import type { PluginContext } from './ctx';

function normalizeOptions(this: PluginContext): ModuleResolveOptions {
  const opts = (this.opts || {}) as ResolveOptions;
  return {
    roots: [this.cwd],
    ...this.opts,
    fileSystem: new CachedInputFileSystem(fs, 4000),
    alias: {
      '@': path.join(this.cwd),
      ...opts.alias,
    },
  };
}

export default normalizeOptions;
