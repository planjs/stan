/**
 * deep freeze object
 * @param object
 */
export default function deepFreeze<T extends Object>(object: T): Readonly<T>;
