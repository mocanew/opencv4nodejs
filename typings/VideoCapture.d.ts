import { Mat } from './Mat.d';

export class VideoCapture {
  constructor(filePathOrdevicePort: string | number, apiPreference?: number);
  get(property: number): number;
  read(): Mat;
  readAsync(): Promise<Mat>;
  release(): void;
  reset(): void;
  set(property: number, value: number): boolean;
  setAsync(property: number, value: number): Promise<boolean>;
  // see VideoWriter for fourcc function
}
