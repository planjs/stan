/**
 * 接受Windows反斜杠路径，并返回带有正斜杠的路径
 * @param path
 */
function slash(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
}

export default slash;
