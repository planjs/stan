import path from 'path';
import * as babel from '@babel/core';
import { ResolverFactory } from 'enhanced-resolve';
import type { ResolveOptions } from 'enhanced-resolve';
import type { PluginContext } from './state';

export function createResolver(resolveOptions: ResolveOptions) {
  return ResolverFactory.createResolver(resolveOptions);
}

function resolvePath(this: PluginContext, node: babel.types.StringLiteral) {
  this.resolver.resolve({}, path.join(this.dirName), node.value, {}, (err, result) => {
    console.log(err);
    console.log(result);
  });
}

export default resolvePath;
