import { Mat } from '@u4/opencv4nodejs';
import { cv, grabFrames } from '../utils.js';
import { makeRunDetectFacenetSSD } from './commons.js';

const runDetection = makeRunDetectFacenetSSD();

const webcamPort = 0;

grabFrames(webcamPort, 1, function(frame: Mat) {
  cv.imshow('result', runDetection(frame, 0.2));
});
