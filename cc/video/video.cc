#include "opencv_modules.h"

#ifdef HAVE_OPENCV_VIDEO

#include "BackgroundSubtractorKNN.h"
#include "BackgroundSubtractorMOG2.h"
#include "video.h"

NAN_MODULE_INIT(Video::Init) {
  BackgroundSubtractorMOG2::Init(target);
  BackgroundSubtractorKNN::Init(target);
};

#endif