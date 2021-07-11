import type { PluginPass } from '@babel/core';
import type { Resolver } from 'enhanced-resolve';

export interface PluginContext extends PluginPass {
  resolver: Resolver;
  cwd: string;
}
