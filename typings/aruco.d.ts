import { Mat } from './Mat';
import { Point2 } from './Point2';

export interface ArucoDetectionResult {
  corners: Point2[][];
  ids: number[];
  rejectedImgPoints: Point2[][];
}

export interface ArucoIdentifyResult {
  identified: boolean;
  idx: number;
  rotation: number;
}

export declare class ArucoDictionary {
  constructor(dictType?: number);
  
  static getPredefinedDictionary(dictType: number): ArucoDictionary;
  
  generateImageMarker(id: number, sidePixels: number, borderBits?: number): Mat;
  generateImageMarkerAsync(id: number, sidePixels: number, borderBits?: number): Promise<Mat>;
  
  identify(onlyBits: Mat, maxCorrectionRate?: number): ArucoIdentifyResult;
  
  getDistanceToId(bits: Mat, id: number, allRotations?: boolean): number;
}

export declare class ArucoDetector {
  constructor(dictionary?: ArucoDictionary);
  
  detectMarkers(image: Mat): ArucoDetectionResult;
  detectMarkersAsync(image: Mat): Promise<ArucoDetectionResult>;
  
  refineDetectedMarkers(
    image: Mat,
    board: any,
    detectedCorners: Point2[][],
    detectedIds: number[],
    rejectedCorners: Point2[][],
    cameraMatrix?: Mat,
    distCoeffs?: Mat
  ): void;
  
  refineDetectedMarkersAsync(
    image: Mat,
    board: any,
    detectedCorners: Point2[][],
    detectedIds: number[],
    rejectedCorners: Point2[][],
    cameraMatrix?: Mat,
    distCoeffs?: Mat
  ): Promise<void>;
}
