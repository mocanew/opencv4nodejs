import { expect } from 'chai';
import { Mat } from '../../../typings';
import { generateAPITests } from '../../utils/generateAPITests';
import { getTestContext } from '../model';
import toTest from '../toTest';

if (toTest.dnn) {
  const { cv, getTestImg } = getTestContext();

  describe('setInput', () => {
    const expectOutput = () => {
      // expect to not throw
    };

    generateAPITests({
      getDut: () => new cv.Net(),
      methodName: 'setInput',
      methodNameSpace: 'Net',
      getRequiredArgs: () => ([
        cv.blobFromImage(getTestImg()),
      ]),
      expectOutput,
    });
  });

  // TODO: load an actual model in tests
  describe.skip('forward', () => {
    const expectOutput = (res: Mat) => {
      expect(res).to.be.instanceOf(cv.Mat);
    };

    generateAPITests({
      getDut: () => new cv.Net(),
      methodName: 'forward',
      methodNameSpace: 'Net',
      expectOutput,
    });
  });
}
