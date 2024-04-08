import toTest from '../toTest';
import VideoCaptureTests from './VideoCaptureTests';
import VideoWriterTests from './VideoWriterTests';

if (toTest.io) {
  if (!process.env.DOCKER_BUILD && !process.env.BINDINGS_DEBUG) {
    describe('VideoCapture', () => VideoCaptureTests());
    // TODO: fix unlink EBUSY
    describe.skip('VideoWriter', () => VideoWriterTests());
  }
}
