import { type OpenCVBuildEnvParams } from '@u4/opencv-build';
import type * as openCV from '../../typings/index.js';
declare type OpenCVType = typeof openCV;
export declare function getOpenCV(opt?: OpenCVBuildEnvParams): OpenCVType;
export default getOpenCV;
