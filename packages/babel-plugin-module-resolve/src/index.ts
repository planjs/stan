import type { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import { PluginContext } from './ctx';
import resolvePath, { createResolver } from './resolve-path';
import normalizeOptions from './normalize-options';

const plugin = ({ types: t }: typeof babel): PluginObj => {
  return {
    name: 'module-resolve',
    pre(this: PluginContext) {
      this.cwd = this.file.opts.root;
      this.resolver = createResolver(normalizeOptions.call(this));
    },
    visitor: {
      ImportDeclaration(nodePath, state) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath.call(this, nodePath.node.source, state);
      },
      ExportNamedDeclaration(nodePath, state) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath.call(this, nodePath.node.source, state);
      },
      ExportAllDeclaration(nodePath, state) {
        if (!t.isStringLiteral(nodePath.node.source)) {
          return;
        }
        resolvePath.call(this, nodePath.node.source, state);
      },
      CallExpression(nodePath, state) {
        if (!t.isImport(nodePath.node.callee)) {
          return;
        }

        if (!t.isStringLiteral(nodePath.node.arguments[0])) {
          return;
        }

        resolvePath.call(this, nodePath.node.arguments[0], state);
      },
    },
  };
};

export default plugin;
