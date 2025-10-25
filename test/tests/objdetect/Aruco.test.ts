import { expect } from 'chai';
import type { ArucoDetectionResult, ArucoIdentifyResult, Point2 } from '../../../typings';
import { generateAPITests } from '../../utils/generateAPITests';
import { getTestContext } from '../model';
import toTest from '../toTest';

if (toTest.objdetect) {
  const { cv, getTestImg } = getTestContext();

  describe('ArucoDictionary', () => {
    describe('constructor', () => {
      it('should be constructable with dictType', () => {
        expect(() => new cv.ArucoDictionary(cv.DICT_4X4_50)).to.not.throw();
      });

      it('should implement identify', () => {
        const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
        expect(dict).to.have.property('identify').to.be.a('function');
      });

      it('should implement getDistanceToId', () => {
        const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
        expect(dict).to.have.property('getDistanceToId').to.be.a('function');
      });
    });

    describe('getPredefinedDictionary', () => {
      it('should return an ArucoDictionary instance', () => {
        const dict = cv.ArucoDictionary.getPredefinedDictionary(cv.DICT_4X4_50);
        expect(dict).to.be.instanceOf(cv.ArucoDictionary);
      });

      it('should work with different dictionary types', () => {
        const dictTypes = [
          cv.DICT_4X4_50,
          cv.DICT_5X5_100,
          cv.DICT_6X6_250,
          cv.DICT_ARUCO_ORIGINAL,
        ];

        dictTypes.forEach((dictType) => {
          expect(() => cv.ArucoDictionary.getPredefinedDictionary(dictType)).to.not.throw();
        });
      });
    });

    describe('getDistanceToId', () => {
      it('should calculate distance to a marker id', () => {
        const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
        const markerId = 5;
        const marker = dict.generateImageMarker(markerId, 200, 1);

        const distance = dict.getDistanceToId(marker, markerId);
        expect(distance).to.be.a('number');
        expect(distance).to.be.at.least(0);
      });
    });
  });

  describe('ArucoDetector', () => {
    describe('constructor', () => {
      it('should be constructable without args', () => {
        expect(() => new cv.ArucoDetector()).to.not.throw();
      });

      it('should be constructable with dictionary', () => {
        const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
        expect(() => new cv.ArucoDetector(dict)).to.not.throw();
      });

      it('should implement detectMarkers', () => {
        const detector = new cv.ArucoDetector();
        expect(detector).to.have.property('detectMarkers').to.be.a('function');
      });

      it('should implement detectMarkersAsync', () => {
        const detector = new cv.ArucoDetector();
        expect(detector).to.have.property('detectMarkersAsync').to.be.a('function');
      });

      it('should implement refineDetectedMarkers', () => {
        const detector = new cv.ArucoDetector();
        expect(detector).to.have.property('refineDetectedMarkers').to.be.a('function');
      });

      it('should implement refineDetectedMarkersAsync', () => {
        const detector = new cv.ArucoDetector();
        expect(detector).to.have.property('refineDetectedMarkersAsync').to.be.a('function');
      });
    });

    describe('detectMarkers', () => {
      const markerId = 5;

      const createTestImageWithMarker = () => {
        // Create a white image
        const img = new cv.Mat(400, 400, cv.CV_8UC3, [255, 255, 255]);

        // Generate a marker
        const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
        const marker = dict.generateImageMarker(markerId, 100, 1).cvtColor(cv.COLOR_GRAY2BGR);

        // Place marker in the center of the image
        const roi = img.getRegion(new cv.Rect(150, 150, 100, 100));
        marker.copyTo(roi);

        return img;
      };

      const getRequiredArgs = () => {
        return [createTestImageWithMarker()];
      };

      const expectOutput = (result: ArucoDetectionResult) => {
        expect(result).to.have.property('corners').to.be.an('array');
        expect(result).to.have.property('ids').to.be.an('array');
        expect(result).to.have.property('rejectedImgPoints').to.be.an('array');
        expect(result.ids[0]).to.equal(markerId);

        // Should detect at least one marker
        expect(result.corners.length).to.be.at.least(0);
        expect(result.ids.length).to.equal(result.corners.length);

        // Each corner set should have 4 points
        result.corners.forEach((markerCorners: Point2[]) => {
          expect(markerCorners).to.be.an('array');
          expect(markerCorners.length).to.equal(4);
          markerCorners.forEach((corner: Point2) => {
            expect(corner).to.have.property('x').to.be.a('number');
            expect(corner).to.have.property('y').to.be.a('number');
          });
        });
      };

      generateAPITests({
        getDut: () => {
          const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
          return new cv.ArucoDetector(dict);
        },
        methodName: 'detectMarkers',
        methodNameSpace: 'ArucoDetector',
        getRequiredArgs,
        expectOutput,
      });

      it('should detect marker in test image', () => {
        const dict = new cv.ArucoDictionary(cv.DICT_4X4_50);
        const detector = new cv.ArucoDetector(dict);
        const img = createTestImageWithMarker();

        const result = detector.detectMarkers(img);

        expect(result.corners.length).to.be.at.least(0);
        if (result.corners.length > 0) {
          expect(result.ids[0]).to.be.a('number');
          expect(result.corners[0].length).to.equal(4);
        }
      });

      it('should return empty arrays for image without markers', () => {
        const detector = new cv.ArucoDetector();
        const img = getTestImg();

        const result = detector.detectMarkers(img);

        expect(result.corners).to.be.an('array');
        expect(result.ids).to.be.an('array');
        expect(result.rejectedImgPoints).to.be.an('array');
      });
    });

    describe('refineDetectedMarkers', () => {
      it('should throw error for not implemented', () => {
        const detector = new cv.ArucoDetector();
        const img = getTestImg();
        const corners: any[][] = [];
        const ids: number[] = [];
        const rejected: any[][] = [];

        expect(() => {
          detector.refineDetectedMarkers(img, null, corners, ids, rejected);
        }).to.throw();
      });
    });
  });

  describe('Aruco Constants', () => {
    it('should have dictionary type constants', () => {
      expect(cv.DICT_4X4_50).to.be.a('number');
      expect(cv.DICT_ARUCO_ORIGINAL).to.be.a('number');
      expect(cv.DICT_APRILTAG_16h5).to.be.a('number');
    });

    it('should have corner refinement constants', () => {
      expect(cv.CORNER_REFINE_NONE).to.be.a('number');
      expect(cv.CORNER_REFINE_SUBPIX).to.be.a('number');
      expect(cv.CORNER_REFINE_CONTOUR).to.be.a('number');
      expect(cv.CORNER_REFINE_APRILTAG).to.be.a('number');
    });
  });
}