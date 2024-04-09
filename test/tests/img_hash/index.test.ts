import imgHashTestsFactory from './imgHashTests';
import { getTestContext } from '../model';
import toTest from '../toTest';

if (toTest.img_hash) {
  const { cv } = getTestContext();
  const imgHashTests = imgHashTestsFactory();
  describe('ImgHash', () => {
    describe('PHash', () => {
      imgHashTests(cv.PHash);
    });
  });
}
