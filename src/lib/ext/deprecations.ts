import assert from 'assert';
import type * as openCV from '../../../typings/index.js'
import type { Mat } from '../../../typings/index.js';

let cv: typeof openCV;
let _calcHist: (img: Mat, histAxes: openCV.HistAxes[], mask?: Mat) => Mat;

function calcHist(img: Mat, histAxes: { channel: number, bins: number, ranges: [number, number] }[], mask?: Mat) {
  assert(img instanceof cv.Mat, 'Imgproc::CalcHist - Error: expected argument 0 to be of type Mat');
  assert(Array.isArray(histAxes), 'Imgproc::CalcHist - Error: expected argument 1 to be of type array of HistAxes');

  histAxes = histAxes.slice();

  let warningThrown = false;
  const len = histAxes.length;

  for (let i = 0; i < len; ++i) {
    const entry = histAxes[i];
    if (!(entry instanceof cv.HistAxes)) {
      if (!warningThrown) {
        warningThrown = true;
        console.warn(`Imgproc::CalcHist - Deprecated support for object in argument 1 at index ${i}. Please switch to using HistAxes instances.`);
      }
      histAxes[i] = new cv.HistAxes(entry);
    }
  }

  if (mask) {
    return _calcHist(img, histAxes, mask);
  }
  return _calcHist(img, histAxes);
}

export default function (newCv: typeof openCV): void {
  // store global cv
  cv = newCv;
  _calcHist = cv.calcHist;

  // deprecate wrapper for the old calcHist API
  // const _calcHist = cv.calcHist;
  cv.calcHist = calcHist;
}
