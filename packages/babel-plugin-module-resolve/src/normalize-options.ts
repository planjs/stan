import fs from 'fs';
import { CachedInputFileSystem } from 'enhanced-resolve';
import type { ModuleResolveOptions } from './types';
import type { PluginContext } from './state';

function normalizeOptions(this: PluginContext): ModuleResolveOptions {
  const opt: ModuleResolveOptions = {
    fileSystem: new CachedInputFileSystem(fs, 4000),
    alias: {
      '@/': ['./*'],
    },
    roots: [this.file.opts.root],
    ...this.opts,
  };
  return opt;
}

export default normalizeOptions;
