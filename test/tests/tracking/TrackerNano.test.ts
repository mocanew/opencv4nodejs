import { expect } from 'chai';
import { Mat, TrackerNano } from '../../../typings';
import { getTestContext } from '../model';
import toTest from '../toTest';

if (toTest.tracking) {
  const {
    cv,
    cvVersionGreaterEqual,
    getTestImg,
  } = getTestContext();

  const hasNano = cvVersionGreaterEqual(4, 7, 0);

  (hasNano ? describe : describe.skip)('TrackerNano', () => {
    let testImg: Mat;

    before(() => {
      testImg = getTestImg();
    });

    describe('constructor', () => {
      it('can be constructed', () => {
        const tracker = new cv.TrackerNano("./TrackerNanoModels/backbone.onnx", "./TrackerNanoModels/neckhead.onnx");
        expect(tracker).to.have.property('init').to.be.a('function');
        expect(tracker).to.have.property('update').to.be.a('function');
      });
    });

    describe('init', () => {
      it('should throw if no args', () => {
        // @ts-expect-error missing args
        expect(() => new cv.TrackerNano().init()).to.throw('Tracker::Init - Error: expected argument 0 to be of type');
      });

      it('can be called with frame and initial box', () => {
        const tracker = new cv.TrackerNano();
        const ret = tracker.init(testImg, new cv.Rect(0, 0, 10, 10));
        expect(ret).to.be.true;
      });
    });

    describe('update', () => {
      it('should throw if no args', () => {
        // @ts-expect-error missing args
        expect(() => new cv.TrackerNano().update()).to.throw('Tracker::Update - Error: expected argument 0 to be of type');
      });

      it('returns bounding box', () => {
        const tracker = new cv.TrackerNano();
        tracker.init(testImg, new cv.Rect(0, 0, 10, 10));
        const rect = tracker.update(testImg);
        expect(rect).to.be.instanceOf(cv.Rect);
      });
    });

  });
}