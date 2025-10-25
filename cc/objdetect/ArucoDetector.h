#include "CatchCvExceptionWorker.h"
#include "Mat.h"
#include "NativeNodeUtils.h"
#include "macros.h"
#include <opencv2/core.hpp>
#include <opencv2/objdetect/aruco_detector.hpp>

#ifndef __FF_ARUCODETECTOR_H__
#define __FF_ARUCODETECTOR_H__

class ArucoDetector : public FF::ObjectWrap<ArucoDetector, cv::aruco::ArucoDetector> {
public:
  static Nan::Persistent<v8::FunctionTemplate> constructor;

  static const char* getClassName() {
    return "ArucoDetector";
  }

  static NAN_MODULE_INIT(Init);
  static NAN_METHOD(New);
  static NAN_METHOD(DetectMarkers);
  static NAN_METHOD(DetectMarkersAsync);
  static NAN_METHOD(RefineDetectedMarkers);
  static NAN_METHOD(RefineDetectedMarkersAsync);
};

#endif