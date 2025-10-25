#include "CatchCvExceptionWorker.h"
#include "Mat.h"
#include "NativeNodeUtils.h"
#include "macros.h"
#include <opencv2/core.hpp>
#include <opencv2/objdetect/aruco_dictionary.hpp>

#ifndef __FF_ARUCODICTIONARY_H__
#define __FF_ARUCODICTIONARY_H__

class ArucoDictionary : public FF::ObjectWrap<ArucoDictionary, cv::aruco::Dictionary> {
public:
  static Nan::Persistent<v8::FunctionTemplate> constructor;

  static const char* getClassName() {
    return "ArucoDictionary";
  }

  static NAN_MODULE_INIT(Init);
  static NAN_METHOD(New);
  static NAN_METHOD(GetPredefinedDictionary);
  static NAN_METHOD(GenerateImageMarker);
  static NAN_METHOD(GenerateImageMarkerAsync);
  static NAN_METHOD(Identify);
  static NAN_METHOD(GetDistanceToId);
};

#endif