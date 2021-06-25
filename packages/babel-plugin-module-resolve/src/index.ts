import type { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import { moduleResolverVisited } from './cache';

const plugin = ({ types: t }: typeof babel): PluginObj => {
  return {
    name: 'module-resolve',
    pre(file) {},
    visitor: {
      ImportDeclaration(nodePath, state) {
        if (!t.isImportDeclaration(nodePath)) {
          return;
        }
        const { node } = nodePath.get('source');
        console.log(node.value);
      },
    },
    post() {
      moduleResolverVisited.clear();
    },
  };
};

export default plugin;
