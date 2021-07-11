import fs from 'fs';
import path from 'path';
import { CachedInputFileSystem } from 'enhanced-resolve';

import type { ModuleResolveOptions } from './types';
import type { PluginContext } from './ctx';

function normalizeOptions(this: PluginContext): ModuleResolveOptions {
  return {
    fileSystem: new CachedInputFileSystem(fs, 4000),
    alias: {
      '@': path.join(this.cwd, 'src'),
    },
    roots: [this.cwd],
    ...this.opts,
  };
}

export default normalizeOptions;
