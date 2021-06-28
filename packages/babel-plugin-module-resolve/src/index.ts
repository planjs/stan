import type { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import { moduleResolverVisited } from './state';
import resolvePath from './resolve-path';

const plugin = ({ types: t }: typeof babel): PluginObj => {
  return {
    name: 'module-resolve',
    pre(file) {
      console.log(file);
      console.log(this.opts);
    },
    visitor: {
      ImportDeclaration(nodePath) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath(nodePath.node.source);
      },
      ExportNamedDeclaration(nodePath) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath(nodePath.node.source);
      },
      ExportAllDeclaration(nodePath) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath(nodePath.node.source);
      },
      CallExpression(nodePath) {
        if (!t.isImport(nodePath.node.callee)) {
          return;
        }

        if (!t.isStringLiteral(nodePath.node.arguments[0])) {
          return;
        }

        resolvePath(nodePath.node.arguments[0]);
      },
    },
    post() {
      moduleResolverVisited.clear();
    },
  };
};

export default plugin;
