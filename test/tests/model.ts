import { cv as realCV, Mat } from '@u4/opencv4nodejs';
import fs from 'fs';
import path from 'path';
import generateClassMethodTestsFactory from '../utils/generateClassMethodTests';
import { fileURLToPath } from 'url';

export type OpenCV = typeof realCV

export interface APITestOpts {

    getDut: () => any,
    methodName: string,
    getRequiredArgs?: () => any[], // optional
    getOptionalArg?: () => any, // optional
    getOptionalArgsMap?: () => { [key: string]: any }, // optional
    prefix?: string, // optional
    methodNameSpace?: string, // optional

    // eslint-disable-next-line no-unused-vars
    expectOutput?: (res: any, dut: any, args: any) => void,

    getClassInstance?: () => any,
    classNameSpace?: string,

    // getOptionalParamsMap?: () => Array<[string, any]|[string]|[number]>,
    getOptionalParams?: () => Array<string | number>,
    getOptionalParamsMap?: () => Array<[string, any]>,

    hasAsync?: boolean,
    otherSyncTests?: () => void,
    otherAsyncCallbackedTests?: () => void,
    otherAsyncPromisedTests?: () => void,
    beforeHook?: (() => void) | null,
    afterHook?: (() => void) | null,
}

const matTypeNames = [
  'CV_8UC1', 'CV_8UC2', 'CV_8UC3', 'CV_8UC4',
  'CV_8SC1', 'CV_8SC2', 'CV_8SC3', 'CV_8SC4',
  'CV_16UC1', 'CV_16UC2', 'CV_16UC3', 'CV_16UC4',
  'CV_16SC1', 'CV_16SC2', 'CV_16SC3', 'CV_16SC4',
  'CV_32SC1', 'CV_32SC2', 'CV_32SC3', 'CV_32SC4',
  'CV_32FC1', 'CV_32FC2', 'CV_32FC3', 'CV_32FC4',
  'CV_64FC1', 'CV_64FC2', 'CV_64FC3', 'CV_64FC4',
] as const;


export function getDirName(): string {
  if ('__dirname' in globalThis) {
      return globalThis.__dirname;
    } else {
      // @ts-ignore
      return fileURLToPath(new URL('.', import.meta.url));
    }    
}


export class TestContext {
  /**
   * lerna cached image
   */
  private lerna512?: Mat;

  /**
   * people cached image
   */
  private people360?: Mat;

  /**
   * lerna cached image resized too 250
   */
  private lerna250?: Mat;

  /**
   * lerna cached Mask image resized too 512 threshold at 128 (CV_8U)
   */
  private maskLerna512?: Mat;

  public get dataPrefix(): string {
    return path.join(getDirName(), '..', '..', 'data');
  }

  constructor(public cv: OpenCV) {
    this.generateClassMethodTests = generateClassMethodTestsFactory(cv);
  }

  public getTestImg: () => Mat = () => {
    if (!this.lerna512) {
      const file = path.resolve(getDirName(), '../utils/Lenna.data');
      this.lerna512 = new this.cv.Mat(fs.readFileSync(file), 512, 512, this.cv.CV_8UC3);
    }
    return this.lerna512;
  };

  public getTestMask: () => Mat = () => {
    if (!this.maskLerna512) {
      this.maskLerna512 = (new this.cv.Mat([[0], [255]], this.cv.CV_8U)).resize(512, 512).threshold(128, 255, this.cv.CV_8U);
    }
    return this.maskLerna512;
  };

  /**
   * @returns lerna image resize to a 250 px square
   */
  public getTestImg250: () => Mat = () => {
    if (!this.lerna250) {
      this.lerna250 = this.getTestImg().resizeToMax(250);
    }
    return this.lerna250;
  };

  public getPeoplesTestImg: () => Mat = () => {
    if (!this.people360) {
      const file = path.resolve(__dirname, '../utils/people.data');
      this.people360 = new this.cv.Mat(fs.readFileSync(file), 360, 640, this.cv.CV_8UC3);
    }
    return this.people360;
  };

  public generateIts = (msg: string, testFunc: (type: number) => void, exclusions = new Set<string>()): void => {
    return matTypeNames.filter((type) => !exclusions.has(type)).forEach((type) => {
      it(`${type} ${msg}`, () => testFunc(this.cv[type]));
    });
  };

  public cvVersionGreaterEqual = (major: number, minor: number, revision: number): boolean => {
    return this.cv.version.major > major
            || (this.cv.version.major === major && this.cv.version.minor > minor)
            || (this.cv.version.major === major && this.cv.version.minor === minor && this.cv.version.revision >= revision);
  };

  public cvVersionLowerThan = (major: number, minor: number, revision: number): boolean => {
    return !this.cvVersionGreaterEqual(major, minor, revision);
  };

  public cvVersionEqual = (major: number, minor: number, revision: number): boolean => {
    return this.cv.version.major === major && this.cv.version.minor === minor && this.cv.version.revision === revision;
  };

  public static getNodeMajorVersion = (): number => {
    return parseInt(process.version.split('.')[0].slice(1));
  };

  public generateClassMethodTests: (opts: Partial<APITestOpts>) => void;

  public getTestImagePath = (isPng = true): string => {
    return this.dataPrefix + (isPng ? '/Lenna.png' : '/got.jpg');
  };

  public getLennaPngPath = (): string => {
    return `${this.dataPrefix}/Lenna.png`;
  };

  public getGotJpgPath = (): string => {
    return `${this.dataPrefix}/got.jpg`;
  };

  public getTestVideoPath = (): string => {
    return `${this.dataPrefix}/traffic.mp4`;
  };
}

const singleton = new TestContext(realCV);

export function getTestContext(): TestContext {
  return singleton;
}
// static singleton: TestContext;
