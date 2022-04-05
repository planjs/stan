import type { PluginOptions } from '@babel/core';
import type { ResolveOptions } from 'enhanced-resolve';

export interface ModuleResolveOptions extends Partial<PluginOptions>, ResolveOptions {}

type AliasOptionNewRequest = string | false | string[];

export interface AliasOptions {
  [index: string]: AliasOptionNewRequest;
}

export type TSConfigType = {
  compilerOptions?: {
    paths?: AliasOptions;
    baseUrl?: string;
  };
};
