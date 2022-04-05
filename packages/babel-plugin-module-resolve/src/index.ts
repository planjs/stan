import type { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import { PluginContext } from './ctx';
import resolvePath, { createResolver } from './resolve-path';
import normalizeOptions from './normalize-options';

const defaultTransformedFunctions = [
  'require',
  'require.resolve',
  'System.import',
  'import',

  // Jest methods
  'jest.genMockFromModule',
  'jest.mock',
  'jest.unmock',
  'jest.doMock',
  'jest.dontMock',
  'jest.setMock',
  'jest.requireActual',
  'jest.requireMock',

  // Older Jest methods
  'require.requireActual',
  'require.requireMock',
];

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
        const callee = nodePath.get('callee');

        const isNormalCall = defaultTransformedFunctions.some((v) => matchesPattern(t, callee, v));

        if (!isNormalCall && !t.isImport(callee)) {
          return;
        }

        resolvePath.call(this, nodePath.node.arguments[0], state);
      },
    },
  };
};

function matchesPattern(t, calleePath, pattern) {
  const { node } = calleePath;

  if (t.isMemberExpression(node)) {
    return calleePath.matchesPattern(pattern);
  }

  if (!t.isIdentifier(node) || pattern.includes('.')) {
    return false;
  }

  const name = pattern.split('.')[0];

  return node.name === name;
}

export default plugin;
