import type { PluginPass } from '@babel/core';
import type { Resolver } from 'enhanced-resolve';

export const moduleResolverVisited = new Set<string>();

export interface PluginContext extends PluginPass {
  resolver: Resolver;
  dirName: string;
}
