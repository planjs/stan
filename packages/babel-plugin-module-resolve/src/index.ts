import type { PluginObj } from '@babel/core';

const plugin = ({ types: t }): PluginObj => {
  return {
    name: 'module-resolve',
    visitor: {
      CallExpression(nodePath, state) {
        console.log(nodePath.get('callee').type);
        console.log(nodePath.get('source'));
      },
      ImportDeclaration(path) {},
      ExportDeclaration(path) {},
    },
  };
};

export default plugin;
