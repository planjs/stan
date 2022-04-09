import type { PluginPass } from '@babel/core';
import type { Resolver } from 'enhanced-resolve';
import * as BabelTypes from '@babel/types';

export interface PluginContext extends PluginPass {
  resolver: Resolver;
  cwd: string;
  visitedNode: Set<any>;
  t: typeof BabelTypes;
}
