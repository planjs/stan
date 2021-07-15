import { PluginObj, template, types, Node } from '@babel/core';

const buildEnumWrapper = template(`
const ID = (function () {
  ENUM;
  return ID
})()
`);

const IIFE_ENUM = '__ENUM_IIFE__';

const plugin = (): PluginObj => {
  return {
    name: 'ts-enum-iife',
    inherits: require('@babel/plugin-syntax-typescript').default,
    visitor: {
      TSEnumDeclaration(path) {
        if (
          path.node.leadingComments &&
          path.node.leadingComments.toString().indexOf(IIFE_ENUM) >= -1
        ) {
          return;
        }

        const nextNode = buildEnumWrapper({
          ID: types.clone(path.node.id),
          ENUM: {
            ...path.node,
            leadingComments: [
              ...(path.node?.leadingComments || []),
              {
                type: 'LineComponent',
                value: IIFE_ENUM,
              },
            ],
          },
        }) as Node;

        path.replaceWith(nextNode);
      },
    },
  };
};

export default plugin;
