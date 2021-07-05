import type { PluginOptions } from '@babel/core';
import type { ResolveOptions } from 'enhanced-resolve';

export interface ModuleResolveOptions extends Partial<PluginOptions>, ResolveOptions {}
