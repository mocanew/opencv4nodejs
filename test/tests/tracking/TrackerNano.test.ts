import { expect } from 'chai';
import { Mat, TrackerNano } from '../../../typings';
import { getTestContext } from '../model';
import toTest from '../toTest';
import path from 'path';  // Import path module to handle file paths
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backbonePath = path.join(__dirname, '/TrackerNanoModels/backbone.onnx');
const neckheadPath = path.join(__dirname, '/TrackerNanoModels/neckhead.onnx');
let tracker: TrackerNano

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
        tracker = new cv.TrackerNano(backbonePath, neckheadPath);
        expect(tracker).to.have.property('init').to.be.a('function');
        expect(tracker).to.have.property('update').to.be.a('function');
      });
    });

    describe('init', () => {
      it('should throw if no args', () => {
        // @ts-expect-error missing args
        expect(() => tracker.init()).to.throw('TrackerNano::Init - Error: expected argument 0 to be of type');
      });

      it('can be called with frame and initial box', () => {
        const ret = tracker.init(testImg, new cv.Rect(0, 0, 10, 10));
        expect(ret).to.be.true;
      });
    });

    describe('update', () => {
      it('should throw if no args', () => {
        // @ts-expect-error missing args
        expect(() => tracker.update()).to.throw('TrackerNano::Update - Error: expected argument 0 to be of type');
      });

      it('returns bounding box', () => {
        tracker.init(testImg, new cv.Rect(0, 0, 10, 10));
        const rect = tracker.update(testImg);
        expect(rect).to.be.instanceOf(cv.Rect);
      });
    });

  });
}
