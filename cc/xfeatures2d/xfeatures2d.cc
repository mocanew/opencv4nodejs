#include "opencv_modules.h"

#ifdef HAVE_OPENCV_XFEATURES2D

#include "SIFTDetector.h"
#include "SURFDetector.h"
#include "xfeatures2d.h"

NAN_MODULE_INIT(XFeatures2d::Init) {
  SIFTDetector::Init(target);
  SURFDetector::Init(target);
};

#endif // HAVE_OPENCV_XFEATURES2D