function isObject(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export default function isPlainObject(o: any): boolean {
  if (!isObject(o)) return false;

  const ctor = o.constructor;
  if (ctor === undefined) return true;

  const prot = ctor.prototype;
  if (!isObject(prot)) return false;

  return prot.hasOwnProperty('isPrototypeOf');
}
