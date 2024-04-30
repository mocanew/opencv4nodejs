import type * as openCV from '../../../typings/index.js';
import type { Mat, Rect } from '../../../typings/index.js';
export declare const allTypes: readonly ["CV_8U", "CV_8S", "CV_16U", "CV_16S", "CV_32S", "CV_32F", "CV_64F", "CV_8UC1", "CV_8UC2", "CV_8UC3", "CV_8UC4", "CV_8SC1", "CV_8SC2", "CV_8SC3", "CV_8SC4", "CV_16UC1", "CV_16UC2", "CV_16UC3", "CV_16UC4", "CV_16SC1", "CV_16SC2", "CV_16SC3", "CV_16SC4", "CV_32SC1", "CV_32SC2", "CV_32SC3", "CV_32SC4", "CV_32FC1", "CV_32FC2", "CV_32FC3", "CV_32FC4", "CV_64FC1", "CV_64FC2", "CV_64FC3", "CV_64FC4"];
export type MatTypes = typeof allTypes[number];
/**
 * Check declaration and doc in cv.d.ts
 */
export declare function getVersion(): [number, number, number];
/**
 * Check declaration and doc in cv.d.ts
 */
export declare function getVersionString(): string;
/**
 * Convert a Mat type to string for easy read
 * non Natif code
 * @param type Mat type as int value
 */
export declare function toMatTypeName(type: number): MatTypes | undefined;
/**
 * Find values greater than threshold in a 32bit float matrix and return a list of matchs formated as [[x1, y1, score1]. [x2, y2, score2], [x3, y3, score3]]
 * add to be used with matchTemplate
 * non Natif code
 * @param scoreMat Matric containing scores as 32Bit float (CV_32F)
 * @param threshold Minimal score to collect
 * @param region search region
 * @returns a list of matchs
 */
export declare function getScoreMax(scoreMat: Mat, threshold: number, region?: Rect): Array<[number, number, number]>;
/**
 * Drop overlaping zones, keeping best one
 * @param template template Matrix used to get dimentions.
 * @param matches list of matches as a list in [x,y,score]. (this data will be altered)
 * @returns best match without colisions
 */
export declare function dropOverlappingZone(template: Mat, matches: Array<[number, number, number]>): Array<[number, number, number]>;
/**
 * register new functions
 * @param cv
 */
export default function (newCv: typeof openCV): void;
