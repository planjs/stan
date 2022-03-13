import execa from 'execa';

function execSync(command: string, args: string[], opts?: execa.SyncOptions) {
  return execa.sync(command, args, opts).stdout;
}

export function getCurrentSHA(opts?: execa.SyncOptions) {
  return execSync('git', ['rev-parse', 'HEAD'], opts);
}

export function getCurrentBranch(opts?: execa.SyncOptions) {
  return execSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], opts);
}

/**
 * @description 获取当前分支+7为hash作为文件名, 分支名如果有 / 会转化成 __
 */
export function getCurrentBranchAndShortSHAPath() {
  const hash = getCurrentSHA()?.slice(0, 7);
  const branch = getCurrentBranch();
  return (branch + '@' + hash).replace(/\//g, '__');
}

/**
 * @description 检查是否有未提交的文件
 * @param opts
 */
export function checkWorkTreeIsClean(opts?: execa.SyncOptions) {
  return execSync('git', ['status'], opts)?.includes('working tree clean');
}

/**
 * @description 获取最新 commit msg
 * @param cwd
 * @param format
 */
export function getCommitMessage(cwd: string, format = '%B') {
  return execSync('git', ['log', '-1', `--pretty=format:${format}`], { cwd });
}
