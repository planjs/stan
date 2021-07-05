import type { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import { moduleResolverVisited, PluginContext } from './state';
import resolvePath, { createResolver } from './resolve-path';
import normalizeOptions from './normalize-options';

const plugin = ({ types: t }: typeof babel): PluginObj => {
  return {
    name: 'module-resolve',
    pre(this: PluginContext) {
      this.dirName = this.file.opts.root;
      this.resolver = createResolver(normalizeOptions.call(this));
    },
    visitor: {
      ImportDeclaration(nodePath) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath.call(this, nodePath.node.source);
      },
      ExportNamedDeclaration(nodePath) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath.call(this, nodePath.node.source);
      },
      ExportAllDeclaration(nodePath) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath.call(this, nodePath.node.source);
      },
      CallExpression(nodePath) {
        if (!t.isImport(nodePath.node.callee)) {
          return;
        }

        if (!t.isStringLiteral(nodePath.node.arguments[0])) {
          return;
        }

        resolvePath.call(this, nodePath.node.arguments[0]);
      },
    },
    post() {
      moduleResolverVisited.clear();
    },
  };
};

export default plugin;
