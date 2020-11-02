import { template, types } from '@babel/core';
import { Node, NodePath } from '@babel/traverse';

const buildEnumWrapper = template(`
const ID = (function () {
  ENUM;
  return ID
})()
`);

const IIFE_ENUM = '__ENUM_IIFE__';

export default () => {
  return {
    name: 'ts-enum-iife',
    inherits: require('@babel/plugin-syntax-typescript').default,
    visitor: {
      TSEnumDeclaration(path: NodePath<types.TSEnumDeclaration>) {
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
              ...(path.node.leadingComments ? path.node.leadingComments : []),
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
