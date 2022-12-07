import { TypeToTypeFn } from "./Board.Interface";

// eslint-disable-next-line @typescript-eslint/ban-types, import/prefer-default-export
export const pipe = <F extends Function, V>(...fns: F[]): TypeToTypeFn<V> => {
  return (initial: V) => fns.reduce((acc, currentFn) => currentFn(acc), initial);
};

export const filterByObjectKeys = (reqQuery: any, keys: string[]) => {
  const queryList = Object.entries(reqQuery).filter(([k, v]) => keys.includes(k));
  return Object.fromEntries(queryList);
};
