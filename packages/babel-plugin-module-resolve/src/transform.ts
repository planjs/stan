import type { NodePath } from '@babel/core';
import type {
  CallExpression,
  ExportAllDeclaration,
  ExportNamedDeclaration,
  ImportDeclaration,
} from '@babel/types';
import type { PluginContext } from './ctx';
import resolve from './resolve';
import * as babel from '@babel/core';

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

export function transformImport(
  nodePath:
    | NodePath<ImportDeclaration>
    | NodePath<ExportNamedDeclaration>
    | NodePath<ExportAllDeclaration>,
  state: PluginContext,
) {
  const { t } = state;
  if (state.visitedNode.has(nodePath)) {
    return;
  }
  if (!t.isStringLiteral(nodePath.node.source)) {
    return;
  }
  state.visitedNode.add(nodePath);
  resolve(nodePath.node.source, state);
}

export function transformCall(nodePath: NodePath<CallExpression>, state: PluginContext) {
  const { t } = state;

  if (state.visitedNode.has(nodePath)) {
    return;
  }

  const callee = nodePath.get('callee');
  const isNormalCall = defaultTransformedFunctions.some((v) => matchesPattern(t, callee, v));

  if (!isNormalCall && !t.isImport(callee)) {
    return;
  }

  state.visitedNode.add(nodePath);
  resolve(nodePath.node.arguments![0]! as babel.types.StringLiteral, state);
}

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
