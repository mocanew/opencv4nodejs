/* eslint-disable no-console */
import { expect } from 'chai';
import cv from '@u4/opencv4nodejs';
import { getTestContext } from './model';
import { builtModules, opencvVersionString } from './toTest';

describe('cv', () => {
  // no more mandatory environement version variable
  // it('OpenCV version should match', () => {
  //   expect((process.env.OPENCV_VERSION || '').substr(0, 5)).to.equal(
  //     // on osx latest opencv package for major version is installed via brew
  //     process.platform === 'darwin' ? `${cv.version.major}` : opencvVersionString
  //   )
  // })

  const ctxt = getTestContext();

  before(() => {
    // force images preload
    ctxt.getTestImg();
    ctxt.getPeoplesTestImg();
  });

  console.log('envs are:');
  console.log('OPENCV_VERSION:', process.env.OPENCV_VERSION);
  console.log('TEST_MODULE_LIST:', process.env.TEST_MODULE_LIST);
  console.log('APPVEYOR_BUILD:', process.env.APPVEYOR_BUILD);
  console.log('process.platform:', process.platform);
  console.log();
  console.log('OpenCV version is:', opencvVersionString);
  console.log('compiled with the following modules:', cv.xmodules);
  console.log(`${builtModules.length} expected modules to be built:`, builtModules);
  const liveModules = Object.entries(cv.modules).filter((a) => a[1]).map((a) => a[0]);
  console.log(`${liveModules.length} visible modules:`, liveModules);

  it('all modules should be built', () => {
    // xfeatures2d is a non free module not available on debian disto
    builtModules.filter((m) => m !== 'xfeatures2d').forEach((m) => expect(cv.modules).to.have.property(m));
  });
});
