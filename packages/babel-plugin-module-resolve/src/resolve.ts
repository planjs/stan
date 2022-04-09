import path from 'path';
import * as babel from '@babel/core';
import type { ResolveContext, ResolveOptions, ResolveRequest } from 'enhanced-resolve';
import { ResolverFactory } from 'enhanced-resolve';
import deasync from 'deasync';

import { isRelativePath, toLocalPath, toPosixPath } from './utils';

import type { PluginContext } from './ctx';

export function createResolver(resolveOptions: ResolveOptions) {
  return ResolverFactory.createResolver(resolveOptions);
}

function resolve(node: babel.types.StringLiteral, state: PluginContext) {
  const filePath = state.file!.opts.filename;

  if (isRelativePath(node.value)) {
    return;
  }

  let result = tryCall<string>([
    // Common module processing will go through here
    () => {
      const result = resolveSync(state, filePath, node.value);
      if (state.cwd.startsWith(result.descriptionFileRoot)) {
        return result.path;
      }
      return false;
    },
    () => {
      // Directly using the root directory folder as a direct import will go through here
      const { dir } = path.parse(filePath);
      let realPath;
      // assuming to be in the root directory
      [state.cwd, dir].some((v) => {
        try {
          realPath = resolveSync(state, v, `./${node.value}`).path;
          return true;
        } catch (e) {
          return false;
        }
      });
      // process current project
      if (realPath && realPath.startsWith(state.cwd)) {
        return realPath;
      }
      // if there are other ...
      return false;
    },
  ]);

  if (result) {
    const { dir, ext } = path.parse(filePath);
    if (path.parse(result).ext === ext) {
      result = result.replace(ext, '');
    }
    node.value = toLocalPath(toPosixPath(path.relative(dir, result)));
  }
}

/**
 * If return false, stop loop return undefined
 * @param fns
 */
function tryCall<T>(fns: Array<() => any>): T {
  let lastErr;
  for (const fn of fns) {
    try {
      const res = fn();
      if (res === false) return;
      return res;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

function resolveSync(state: PluginContext, path: string, request: string): ResolveRequest {
  const fn = (
    context: object,
    path: string,
    request: string,
    resolveContext: ResolveContext,
    callback: (arg0: null | Error, arg2?: ResolveRequest) => void,
  ) => {
    return state.resolver.resolve(context, path, request, resolveContext, (err, path, rsp) => {
      callback(err, rsp);
    });
  };
  return deasync<object, string, string, ResolveContext, ResolveRequest>(fn)({}, path, request, {});
}

export default resolve;
