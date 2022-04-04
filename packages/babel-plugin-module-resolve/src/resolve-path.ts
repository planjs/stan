import path from 'path';
import * as babel from '@babel/core';
import type { ResolveContext, ResolveOptions } from 'enhanced-resolve';
import { ResolverFactory } from 'enhanced-resolve';
import deasync from 'deasync';

import { toLocalPath, toPosixPath } from './utils';

import type { PluginContext } from './ctx';

export function createResolver(resolveOptions: ResolveOptions) {
  return ResolverFactory.createResolver(resolveOptions);
}

function resolvePath(
  this: PluginContext,
  node: babel.types.StringLiteral,
  state: babel.PluginPass,
) {
  const filePath = state.file!.opts.filename;
  let result = deasync<object, string, string, ResolveContext, string>(
    this.resolver.resolve.bind(this.resolver),
  )({}, filePath, node.value, {});

  if (result) {
    const { dir, ext } = path.parse(filePath);
    if (path.parse(result).ext === ext) {
      result = result.replace(ext, '');
    }
    node.value = toLocalPath(toPosixPath(path.relative(dir, result)));
  }
}

export default resolvePath;
