import { Mat } from './Mat.d';
import { Rect } from './Rect.d';

export class TrackerNano {
  /**
   * Creates a new TrackerNano object.
   * @param backboneModelPath Optional path to the backbone ONNX model.
   * @param neckheadModelPath Optional path to the neckhead ONNX model.
   */
  constructor(backboneModelPath?: string, neckheadModelPath?: string);
  
  clear(): void;
  init(frame: Mat, boundingBox: Rect): boolean;
  update(frame: Mat): Rect;
}
