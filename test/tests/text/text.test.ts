import path from 'path';
import { expect } from 'chai';
import { getTestContext } from '../model';
import { assertMetaData } from '../../utils/matTestUtils';
import { generateAPITests } from '../../utils/generateAPITests';
import toTest from '../toTest';

if (toTest.text) {
  const { cv, cvVersionGreaterEqual } = getTestContext();

  describe('loadOCRHMMClassifierNM', () => {
    generateAPITests({
      getDut: () => cv,
      methodName: 'loadOCRHMMClassifierNM',
      getRequiredArgs: () => ([
        path.resolve('../data/text-models/OCRHMM_knn_model_data.xml.gz'),
      ]),
      expectOutput: (classifier) => {
        expect(classifier).to.be.instanceOf(cv.OCRHMMClassifier);
      },
    });
  });

  if (cvVersionGreaterEqual(3, 1, 0)) {
    describe('loadOCRHMMClassifierCNN', () => {
      generateAPITests({
        getDut: () => cv,
        methodName: 'loadOCRHMMClassifierCNN',
        getRequiredArgs: () => ([
          path.resolve('../data/text-models/OCRBeamSearch_CNN_model_data.xml.gz'),
        ]),
        expectOutput: (classifier) => {
          expect(classifier).to.be.instanceOf(cv.OCRHMMClassifier);
        },
      });
    });

    describe('createOCRHMMTransitionsTable', () => {
      const vocabulary = 'abcdefghijklmnopqrstuvwxyz';
      const lexicon = ['foo', 'bar', 'what', 'the', 'heck'];

      generateAPITests({
        getDut: () => cv,
        methodName: 'createOCRHMMTransitionsTable',
        getRequiredArgs: () => ([
          vocabulary,
          lexicon,
        ]),
        expectOutput: (transitionPTable) => {
          expect(transitionPTable).to.be.instanceOf(cv.Mat);
          assertMetaData(transitionPTable)(26, 26, cv.CV_64F);
        },
      });
    });
  }
}
