import * as babel from '@babel/core';
import { create } from 'enhanced-resolve';
import type { ResolveOptions } from 'enhanced-resolve';

function resolvePath(node: babel.types.StringLiteral) {
  try {
    create({} as ResolveOptions)('/some/path/to/folder', 'ts-module', (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    });
  } catch (e) {}
  console.log(node.value);
}

export default resolvePath;
