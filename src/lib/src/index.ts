import makeDrawUtils from './drawUtils.js';
import deprecations from './deprecations.js';
import * as OpenCV from '../../../typings/index.js';
import misc from './misc.js';

export default function extendWithJsSources(cv: typeof OpenCV) {
  // add functions
  makeDrawUtils(cv);
  // add functions
  misc(cv);
  deprecations(cv);
  return cv;
}