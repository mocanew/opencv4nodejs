/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert, expect } from 'chai';

import { assertError, asyncFuncShouldRequireArgs, _funcShouldRequireArgs as funcShouldRequireArgs } from './testUtils';

import { emptyFunc, getEmptyArray } from './commons';
import { APITestOpts, OpenCV } from '../tests/model';

export type PartialAPITestOpts = Pick<APITestOpts, 'getDut' | 'methodName'> & Partial<APITestOpts>;
// | 'methodName' | 'methodNameSpace' | 'expectOutput' | 'getOptionalArg' | 'getOptionalArgsMap' | 'hasAsync' | 'otherSyncTests' | 'otherAsyncCallbackedTests' | 'otherAsyncPromisedTests' | 'beforeHook' | 'afterHook'

export const getDefaultAPITestOpts = (opts: PartialAPITestOpts): APITestOpts => ({
  hasAsync: true,
  otherSyncTests: emptyFunc,
  otherAsyncCallbackedTests: emptyFunc,
  otherAsyncPromisedTests: emptyFunc,
  beforeHook: null,
  afterHook: null,
  ...opts,
});

// eslint-disable-next-line no-unused-vars
type DoneError = (err?: unknown) => void;

export const generateAPITests = (opts_: PartialAPITestOpts): void => {
  const opts = getDefaultAPITestOpts(opts_);

  const methodNameAsync = `${opts.methodName}Async`;
  const getRequiredArgs = opts.getRequiredArgs || getEmptyArray;
  const getOptionalArgs = opts.getOptionalArg
    ? () => [opts.getOptionalArg()]
    : (opts.getOptionalArgsMap
      ? () => opts.getOptionalArgsMap().map((kv: [string, any]) => kv[1])
      : getEmptyArray
    );
  const getOptionalArgsObject = () => {
    const optionalArgsObject: {[key: string]: any} = {};
    opts.getOptionalArgsMap().forEach(([k, v]: [string, any]) => { optionalArgsObject[k] = v; });
    return optionalArgsObject;
  };
  const prefix = opts.prefix ? `${opts.prefix} ` : '';
  const hasRequiredArgs = !!opts.getRequiredArgs;
  const hasOptArgs = !!opts.getOptionalArg || !!opts.getOptionalArgsMap;
  const hasOptArgsObject = !!opts.getOptionalArgsMap;

  const expectAsyncOutput = (done: DoneError, dut: OpenCV, args: any[], res: any) => {
    try {
      opts.expectOutput(res, dut, args);
      done();
    } catch (err2) {
      done(err2);
    }
  };

  const expectOutputCallbacked = (done: DoneError, dut: OpenCV, args: any[]) => (err: Error | null, res: any) => {
    if (err) {
      done(err);
    } else {
      expectAsyncOutput(done, dut, args, res);
    }
  };

  const expectOutputPromisified = (done: DoneError, dut: OpenCV, args: any[]) => (res: any) => expectAsyncOutput(done, dut, args, res);

  const generateTests = (type: 'callbacked' | 'promised' | 'sync') => {
    const method = (type === 'sync') ? opts.methodName : methodNameAsync;
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    const getErrPrefix = () => `${(opts.methodNameSpace ? `${opts.methodNameSpace}::` : '')}${capitalize(method)} - Error:`;
    const typeErrMsg = (argN: number) => `${getErrPrefix()} expected argument ${argN} to be of type`;
    const propErrMsg = (prop: string) => `${getErrPrefix()} expected property ${prop} to be of type`;

    const expectSuccess = (args: any[], done: DoneError) => {
      const dut = opts.getDut();
      switch (type) {
        case 'promised': // Use Promise
          return dut[method].apply(dut, args)
            .then(expectOutputPromisified(done, dut, args))
            .catch(done);
        case 'callbacked': // Use Callback
          args.push(expectOutputCallbacked(done, dut, args));
          return dut[method].apply(dut, args);
        default: {// Use Sync
          const result = dut[method].apply(dut, args);
          opts.expectOutput(result, dut, args);
          return done();
        }
      }
    };

    const expectError = (args: any[], errMsg: string, done: DoneError) => {
      const dut = opts.getDut();
      switch (type) {
        case 'promised': // Use Promise
        return dut[method].apply(dut, args)
          .then(() => done('expected an error to be thrown'))
          .catch((err: unknown) => {
            assert.include(err.toString(), errMsg);
            done();
          })
          .catch(done);
          case 'callbacked': // Use Callback
          const argsWithCb = args.concat((err: Error) => {
            try {
              expect(err).to.be.an('error');
              assert.include(err.toString(), errMsg);
              done();
            } catch (e) {
              done(e);
            }
          });
          return dut[method].apply(dut, argsWithCb);
          default: // Use Sync
          assertError(
            () => dut[method].apply(dut, args),
            errMsg,
          );
          return done();
      }
    };

    it(`${prefix}should be callable with required args`, (done: DoneError) => {
      const args = getRequiredArgs().slice();
      expectSuccess(args, done);
    });

    if (hasRequiredArgs) {
      it(`${prefix}should throw if required arg invalid`, (done: DoneError) => {
        const args: undefined[] = [undefined];
        expectError(args, typeErrMsg(0), done);
      });
    }

    if (hasOptArgs) {
      it(`${prefix}should be callable with optional args`, (done: DoneError) => {
        const args = getRequiredArgs().slice().concat(getOptionalArgs());
        expectSuccess(args, done);
      });

      it(`${prefix}should throw if opt arg invalid`, (done: DoneError) => {
        const args = getRequiredArgs().slice().concat(undefined);
        expectError(args, typeErrMsg(getRequiredArgs().length), done);
      });

      if (hasOptArgsObject) {
        it(`${prefix}should be callable with optional args object`, (done: DoneError) => {
          const args = getRequiredArgs().slice().concat(getOptionalArgsObject());
          expectSuccess(args, done);
        });

        it(`${prefix}should throw if opt arg object prop invalid`, (done: DoneError) => {
          const prop = opts.getOptionalArgsMap()[0][0];
          const args = getRequiredArgs().slice().concat({
            [prop]: undefined,
          });
          expectError(args, propErrMsg(prop), done);
        });
      }
    }
  };

  describe('sync', () => {
    if (opts.beforeHook) {
      beforeEach(() => opts.beforeHook());
    }
    if (opts.afterHook) {
      afterEach(() => opts.afterHook());
    }

    if (hasRequiredArgs) {
      funcShouldRequireArgs(() => opts.getDut()[opts.methodName]());
    }

    generateTests('sync');

    opts.otherSyncTests();
  });

  if (opts.hasAsync) {
    describe(`${prefix}async`, () => {
      if (hasRequiredArgs) {
        asyncFuncShouldRequireArgs(() => opts.getDut()[methodNameAsync]());
      }

      describe(`${prefix}callbacked`, () => {
        if (opts.beforeHook) {
          beforeEach(() => opts.beforeHook());
        }
        if (opts.afterHook) {
          afterEach(() => opts.afterHook());
        }

        generateTests('callbacked');

        opts.otherAsyncCallbackedTests();
      });

      describe(`${prefix}promisified`, () => {
        if (opts.beforeHook) {
          beforeEach(() => opts.beforeHook());
        }
        if (opts.afterHook) {
          afterEach(() => opts.afterHook());
        }

        generateTests('promised');

        opts.otherAsyncPromisedTests();
      });
    });
  }
};
