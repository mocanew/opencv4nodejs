/* eslint-disable @typescript-eslint/no-explicit-any */
const isFn = (obj: unknown) => typeof obj === 'function';

const isAsyncFn = (fn: (...args: any[]) => any) => {
  try {
    return fn.prototype.constructor.name.endsWith('Async');
  } catch (e) {
    return false;
  }
};

const promisify = (fn: (...args: any[]) => any) => function toPromise(this: any, ...params: any[]) {
  if (isFn(params[params.length - 1])) {
    return fn.apply(this, params as Parameters<typeof fn>);
  }

  return new Promise((resolve, reject) => {
    const args = Array.prototype.slice.call(params);
    args.push(function pomisifyed(err: Error, res: any) {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });

    fn.apply(this, args);
  });
};

export default <T extends { [key: string]: any }>(cv: T): T => {
  const fns = Object.keys(cv).filter(k => isFn(cv[k])).map(k => cv[k]);
  const asyncFuncs = fns.filter(isAsyncFn);
  const clazzes = fns.filter(fn => fn.prototype && !!Object.keys(fn.prototype).length);

  clazzes.forEach((clazz) => {
    const protoFnKeys = Object.keys(clazz.prototype).filter(k => isAsyncFn(clazz.prototype[k]));
    protoFnKeys.forEach(k => clazz.prototype[k] = promisify(clazz.prototype[k]));
  });

  asyncFuncs.forEach((fn) => {
    const {name} = fn.prototype.constructor;
    (cv as any)[name] = promisify(fn);
  });

  return cv;
};