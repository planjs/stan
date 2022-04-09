export function isRelativePath(nodePath) {
  return nodePath.match(/^\.?\.\//);
}

export function toPosixPath(modulePath) {
  return modulePath.replace(/\\/g, '/');
}

export function toLocalPath(modulePath) {
  let localPath = modulePath.replace(/\/index$/, '');
  if (!isRelativePath(localPath)) {
    localPath = `./${localPath}`;
  }
  return localPath;
}
