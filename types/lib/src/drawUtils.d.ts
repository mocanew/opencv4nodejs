import type * as openCV from '../../../typings/index.js';
import { Mat, Rect, Vec3 } from '../../../typings/index.js';
export interface TextParams {
    fontType: number;
    fontSize: number;
    thickness: number;
    lineType: number;
}
export interface FontParams extends DrawParams {
    fontType?: number;
    fontSize?: number;
}
export interface TextLines extends FontParams {
    text: string;
}
export interface TextDimention {
    width: number;
    height: number;
    baseLine: number;
}
export interface DrawParams {
    color?: Vec3;
    thickness?: number;
    lineType?: number;
    shift?: number;
}
export declare function drawTextBox(img: Mat, upperLeft: {
    x: number;
    y: number;
}, textLines: TextLines[], alpha: number): Mat;
export interface DrawDetectionParams extends DrawParams {
    segmentFraction?: number;
}
export declare function drawDetection(img: Mat, inputRect: Rect, opts?: DrawDetectionParams): Rect;
export default function (newCv: typeof openCV): void;
