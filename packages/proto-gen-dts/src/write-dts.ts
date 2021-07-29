import path from 'path';
import { loadSync, getProtoPath } from 'google-proto-files';
import { Namespace, ReflectionObject } from 'protobufjs';
import { fs, chalk } from 'stan-utils';

import type { IParseOptions } from 'protobufjs';
import type { GenProtoFile } from './type';

import { writeBanner, reportIssues, replaceSamePath } from './util';
import parseNamespace from './parse-namespace';
import { Visitor } from './type';

/**
 * record parsed files
 */
const parsedFiles: string[] = [];

/**
 * generate dts file
 * @param proto
 * @param opts
 * @param visitor
 * @returns generate files
 */
export default function writeDTS(
  proto: GenProtoFile,
  opts?: IParseOptions,
  visitor?: Visitor,
): string[] {
  const { generateDependentModules = true } = proto;

  if (parsedFiles.includes(proto.file)) {
    return [proto.file];
  }

  function loadFile(file: string) {
    const root = loadSync(file, opts);
    if (!root.nestedArray.length) {
      console.log(chalk.yellowBright(`Warning "${proto.file}" is empty`));
    }
    return root;
  }

  // only compile namespace
  // false where throw error
  function checkCanCompile(reflection: ReflectionObject): reflection is Namespace {
    const can = reflection instanceof Namespace;
    if (!can) {
      console.log(
        chalk.yellowBright(
          `Check whether the version of protobufjs that google-proto-files depends on is consistent with the version of protobufjs in the project.`,
        ),
      );
      throw new Error(reportIssues({ title: `Type ${reflection?.name} not supported.` }));
    }
    return can;
  }

  const root = loadFile(proto.file);

  const generatedFiles: string[] = [];

  const reflection = root.nestedArray[0];

  if (!reflection) {
    return generatedFiles;
  }

  if (checkCanCompile(reflection)) {
    const outPath = path.resolve(proto.output!);
    const parsed = parseNamespace(reflection, root.files[0], visitor);
    fs.outputFileSync(outPath, writeBanner(parsed));
    generatedFiles.push(outPath);
    parsedFiles.push(proto.file);

    const protoLibDir = getProtoPath();
    if (generateDependentModules && root.files.length > 1) {
      for (let file of root.files.slice(1)) {
        if (parsedFiles.includes(file)) {
          continue;
        }
        const orgFile = file;
        const root = loadFile(file);
        const reflection = root.nestedArray[0];

        if (!reflection) {
          continue;
        }

        const isLibFile = file.startsWith(protoLibDir);

        if (checkCanCompile(reflection)) {
          const parsed = parseNamespace(reflection, file, visitor);
          const { dir } = path.parse(proto.output!);
          // internal proto file, beautify the generation path
          if (file.startsWith(protoLibDir)) {
            file = replaceSamePath(protoLibDir, file);
          }
          // beautify the proto lib path
          if (isLibFile) {
            file = path.join('google', file);
          }
          // generate a file based on the relative position of the file
          const { dir: importDir, name: fileName } = path.parse(replaceSamePath(proto.file, file));
          const outPath = path.resolve(dir, importDir, `${fileName}.d.ts`);
          fs.outputFileSync(outPath, writeBanner(parsed));
          generatedFiles.push(outPath);
          parsedFiles.push(orgFile);
        }
      }
    }
  }

  return generatedFiles;
}
