#include "opencv_modules.h"

#ifdef HAVE_OPENCV_OBJDETECT

#include "CascadeClassifier.h"
#include "DetectionROI.h"
#include "HOGDescriptor.h"
#include "ArucoDictionary.h"
#include "ArucoDetector.h"
#include "arucoConstants.h"
#include "objdetect.h"

NAN_MODULE_INIT(Objdetect::Init) {
  CascadeClassifier::Init(target);
  HOGDescriptor::Init(target);
  DetectionROI::Init(target);
  ArucoDictionary::Init(target);
  ArucoDetector::Init(target);
  ArucoConstants::Init(target);
};

#endif