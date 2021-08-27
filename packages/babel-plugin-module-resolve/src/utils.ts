export function toPosixPath(modulePath) {
  return modulePath.replace(/\\/g, '/');
}
