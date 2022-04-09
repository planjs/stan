import type { PluginObj } from '@babel/core';
import * as babel from '@babel/core';

import { PluginContext } from './ctx';
import { createResolver } from './resolve';
import normalizeOptions from './normalize-options';
import { transformCall, transformImport } from './transform';

const plugin = ({ types: t }: typeof babel): PluginObj => {
  return {
    name: 'module-resolve',
    pre(this: PluginContext) {
      this.cwd = this.file.opts.root;
      this.resolver = createResolver(normalizeOptions.call(this));
      this.visitedNode = new Set();
      this.t = t;
    },
    post(this: PluginContext) {
      this.visitedNode.clear();
    },
    visitor: {
      ImportDeclaration: transformImport,
      ExportNamedDeclaration: transformImport,
      ExportAllDeclaration: transformImport,
      CallExpression: transformCall,
    },
  };
};

export default plugin;
