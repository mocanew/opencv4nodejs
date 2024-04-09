import cv from '@u4/opencv4nodejs';
import { getTestContext } from './model';

const modules = [
  'core', 'imgproc', 'calib3d', 'features2d', 'io',
  'dnn', 'ml', 'objdetect', 'photo', 'video',
];

const xmodules = [
  'face', 'text', 'tracking', 'xfeatures2d', 'ximgproc', 'img_hash',
];

export const toTest: {[key: string]: boolean} = {
  core: true,
  imgproc: false, // to fix
  calib3d: true,
  features2d: true,
  io: true,
  dnn: true,
  machinelearning: true,
  objdetect: false, // to fix
  photo: true,
  video: true,
  face: true,
  text: true,
  tracking: true,
  xfeatures2d: true,
  ximgproc: true,
  img_hash: true,
};
  // phash branch only
  // Object.keys(toTest).forEach((m) => { toTest[m] = false; });
  // toTest.img_hash = true;

let _builtModules = modules.concat(xmodules);
if (process.env.APPVEYOR_BUILD) {
  // OpenCV installed via choco does not include contrib modules
  _builtModules = modules;
}
if (process.env.TEST_MODULE_LIST) {
  _builtModules = process.env.TEST_MODULE_LIST.split(',');
}

const ctxt = getTestContext();

if (ctxt.cvVersionLowerThan(3, 3, 0)) {
  _builtModules = _builtModules.filter((m) => m !== 'dnn');
}

toTest.core = toTest.core && cv.modules.core;
toTest.calib3d = toTest.calib3d && cv.modules.calib3d;
toTest.imgproc = toTest.imgproc && cv.modules.imgproc;
toTest.features2d = toTest.features2d && cv.modules.features2d;
toTest.io = toTest.io && cv.modules.io;
toTest.dnn = toTest.dnn && cv.modules.dnn;
toTest.machinelearning = toTest.machinelearning && cv.modules.machinelearning;
toTest.objdetect = toTest.objdetect && cv.modules.objdetect;
toTest.photo = toTest.photo && cv.modules.photo;
toTest.video = toTest.video && cv.modules.video;
toTest.face = toTest.face && cv.modules.face;
toTest.text = toTest.text && cv.modules.text;
toTest.tracking = toTest.tracking && cv.modules.tracking;
toTest.xfeatures2d = toTest.xfeatures2d && cv.modules.xfeatures2d;
toTest.ximgproc = toTest.ximgproc && cv.modules.ximgproc;
toTest.img_hash = toTest.img_hash && cv.modules.img_hash;

export const builtModules = _builtModules;

export const opencvVersionString = `${cv.version.major}.${cv.version.minor}.${cv.version.revision}`;

export default toTest;
