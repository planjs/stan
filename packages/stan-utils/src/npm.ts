import fs from 'fs';
import path from 'path';
import execa from 'execa';

type NpmClientType = 'npm' | 'yarn' | 'pnpm';

type GetNpmClientReturnType = {
  client: NpmClientType;
  isWorkspace: boolean;
};

function checkIsNpmProject(cwd: string) {
  const pkgJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) {
    throw new Error('package.json does not exist.');
  }
}

/**
 * 检查是否是npm workspace
 * @param cwd
 * @param client
 */
export function checkIsWorkspace(cwd: string, client: NpmClientType) {
  checkIsNpmProject(cwd);
  const pkgJsonPath = path.join(cwd, 'package.json');
  if (client === 'yarn' || client === 'npm') {
    const pkg = require(pkgJsonPath);
    return typeof pkg.workspaces === 'object';
  }
  if (client === 'pnpm') {
    return !!tryExistsSync(['pnpm-workspace.yaml'], cwd);
  }
  return false;
}

/**
 * 获取项目使用的npm client
 * @param args
 */
export function getNpmClient(args?: { cwd?: string }): GetNpmClientReturnType {
  const { cwd = process.cwd() } = args || {};
  checkIsNpmProject(cwd);
  const result: GetNpmClientReturnType = {
    client: 'npm',
    isWorkspace: false,
  };
  if (
    tryExistsSync(
      [
        'pnpm-lock.yaml',
        '.pnpmfile.cjs',
        'pnpm-workspace.yaml',
        path.join('node_modules', '.pnpm'),
      ],
      cwd,
    )
  ) {
    result.client = 'pnpm';
    result.isWorkspace = checkIsWorkspace(cwd, 'pnpm');
  }

  if (tryExistsSync(['yarn.lock', '.yarnrc', path.join('node_modules', '.yarn-integrity')], cwd)) {
    result.client = 'yarn';
    result.isWorkspace = checkIsWorkspace(cwd, 'yarn');
  }
  return result;
}

function tryExistsSync(paths: string[], basePath: string): string | void {
  return paths.map((v) => path.join(basePath, v)).find((v) => fs.existsSync(v));
}

/**
 * 安装依赖
 * @param npmClient
 * @param cwd
 */
export function installWithNpmClient({
  npmClient,
  cwd,
}: {
  npmClient?: NpmClientType;
  cwd?: string;
}) {
  const npm = execa.sync(npmClient || getNpmClient({ cwd }).client, ['install'], {
    stdio: 'inherit',
    cwd,
  });
  if (npm.failed) {
    throw npm.stderr;
  }
}

/**
 * 安装新的依赖
 * @param args
 */
export function installDeps(args: {
  devDependencies?: string[];
  dependencies?: string[];
  peerDependencies?: string[];
  cwd?: string;
  npmClient?: NpmClientType;
}) {
  const {
    dependencies = [],
    devDependencies = [],
    peerDependencies = [],
    cwd = process.cwd(),
    npmClient = getNpmClient({ cwd }).client,
  } = args;
  const isWorkspace = checkIsWorkspace(cwd, npmClient);
  const useYarn = npmClient === 'yarn';
  const usePnpm = npmClient === 'pnpm';
  const install = useYarn || usePnpm ? 'add' : 'install';
  const devTag = useYarn || usePnpm ? '--D' : '--save-dev';
  const peerTag = useYarn ? '--peer' : '--save-peer';
  const wpTag = useYarn ? '-W' : '--workspace';

  function execInstall(deps: string[], isDev = false, isPeer = false) {
    const { exitCode, stderr } = execa.sync(
      npmClient,
      [
        install,
        ...deps,
        isDev ? devTag : '',
        isPeer ? peerTag : '',
        isWorkspace ? wpTag : '',
      ].filter((v) => v),
      {
        encoding: 'utf8',
        cwd,
        env: {
          ...process.env,
        },
        stderr: 'pipe',
        stdout: 'pipe',
      },
    );

    if (exitCode !== 0) {
      throw new Error(stderr);
    }
  }

  if (dependencies.length) {
    execInstall(dependencies);
  }

  if (devDependencies.length) {
    execInstall(devDependencies, true);
  }

  if (peerDependencies.length) {
    execInstall(peerDependencies, false, true);
  }
}
