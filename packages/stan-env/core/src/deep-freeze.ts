/**
 * deep freeze object
 * @param object
 */
export default function deepFreeze<T extends Object>(object: T): Readonly<T> {
  const propNames = Object.getOwnPropertyNames(object);
  for (let name of propNames) {
    let value = object[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
