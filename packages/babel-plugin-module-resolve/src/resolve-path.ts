import path from 'path';
import * as babel from '@babel/core';
import { ResolverFactory } from 'enhanced-resolve';
import deasync from 'deasync';

import type { ResolveOptions, Resolver } from 'enhanced-resolve';

import { toPosixPath } from './utils';

import type { PluginContext } from './ctx';

export function createResolver(resolveOptions: ResolveOptions) {
  return ResolverFactory.createResolver(resolveOptions);
}

function resolvePath(this: PluginContext, node: babel.types.StringLiteral) {
  const result = deasync(this.resolver.resolve.bind(this.resolver))(
    // @ts-ignore
    {},
    path.join(this.cwd, 'src'),
    node.value,
    {},
  ) as string;
  if (result) {
    const modulePath = path.relative(path.join(this.cwd, 'src'), result);
    node.value = toPosixPath(modulePath);
  }
}

export default resolvePath;
