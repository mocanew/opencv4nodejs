#include "opencv_modules.h"

#ifdef HAVE_OPENCV_OBJDETECT

#include "arucoConstants.h"
#include <opencv2/objdetect/aruco_dictionary.hpp>
#include <opencv2/objdetect/aruco_detector.hpp>

void ArucoConstants::Init(v8::Local<v8::Object> target) {
  // Predefined dictionary types
  FF_SET_JS_PROP(target, DICT_4X4_50, Nan::New<v8::Integer>(cv::aruco::DICT_4X4_50));
  FF_SET_JS_PROP(target, DICT_4X4_100, Nan::New<v8::Integer>(cv::aruco::DICT_4X4_100));
  FF_SET_JS_PROP(target, DICT_4X4_250, Nan::New<v8::Integer>(cv::aruco::DICT_4X4_250));
  FF_SET_JS_PROP(target, DICT_4X4_1000, Nan::New<v8::Integer>(cv::aruco::DICT_4X4_1000));
  FF_SET_JS_PROP(target, DICT_5X5_50, Nan::New<v8::Integer>(cv::aruco::DICT_5X5_50));
  FF_SET_JS_PROP(target, DICT_5X5_100, Nan::New<v8::Integer>(cv::aruco::DICT_5X5_100));
  FF_SET_JS_PROP(target, DICT_5X5_250, Nan::New<v8::Integer>(cv::aruco::DICT_5X5_250));
  FF_SET_JS_PROP(target, DICT_5X5_1000, Nan::New<v8::Integer>(cv::aruco::DICT_5X5_1000));
  FF_SET_JS_PROP(target, DICT_6X6_50, Nan::New<v8::Integer>(cv::aruco::DICT_6X6_50));
  FF_SET_JS_PROP(target, DICT_6X6_100, Nan::New<v8::Integer>(cv::aruco::DICT_6X6_100));
  FF_SET_JS_PROP(target, DICT_6X6_250, Nan::New<v8::Integer>(cv::aruco::DICT_6X6_250));
  FF_SET_JS_PROP(target, DICT_6X6_1000, Nan::New<v8::Integer>(cv::aruco::DICT_6X6_1000));
  FF_SET_JS_PROP(target, DICT_7X7_50, Nan::New<v8::Integer>(cv::aruco::DICT_7X7_50));
  FF_SET_JS_PROP(target, DICT_7X7_100, Nan::New<v8::Integer>(cv::aruco::DICT_7X7_100));
  FF_SET_JS_PROP(target, DICT_7X7_250, Nan::New<v8::Integer>(cv::aruco::DICT_7X7_250));
  FF_SET_JS_PROP(target, DICT_7X7_1000, Nan::New<v8::Integer>(cv::aruco::DICT_7X7_1000));
  FF_SET_JS_PROP(target, DICT_ARUCO_ORIGINAL, Nan::New<v8::Integer>(cv::aruco::DICT_ARUCO_ORIGINAL));
  FF_SET_JS_PROP(target, DICT_APRILTAG_16h5, Nan::New<v8::Integer>(cv::aruco::DICT_APRILTAG_16h5));
  FF_SET_JS_PROP(target, DICT_APRILTAG_25h9, Nan::New<v8::Integer>(cv::aruco::DICT_APRILTAG_25h9));
  FF_SET_JS_PROP(target, DICT_APRILTAG_36h10, Nan::New<v8::Integer>(cv::aruco::DICT_APRILTAG_36h10));
  FF_SET_JS_PROP(target, DICT_APRILTAG_36h11, Nan::New<v8::Integer>(cv::aruco::DICT_APRILTAG_36h11));
  FF_SET_JS_PROP(target, DICT_ARUCO_MIP_36h12, Nan::New<v8::Integer>(cv::aruco::DICT_ARUCO_MIP_36h12));

  // Corner refinement methods
  FF_SET_JS_PROP(target, CORNER_REFINE_NONE, Nan::New<v8::Integer>(cv::aruco::CornerRefineMethod::CORNER_REFINE_NONE));
  FF_SET_JS_PROP(target, CORNER_REFINE_SUBPIX, Nan::New<v8::Integer>(cv::aruco::CornerRefineMethod::CORNER_REFINE_SUBPIX));
  FF_SET_JS_PROP(target, CORNER_REFINE_CONTOUR, Nan::New<v8::Integer>(cv::aruco::CornerRefineMethod::CORNER_REFINE_CONTOUR));
  FF_SET_JS_PROP(target, CORNER_REFINE_APRILTAG, Nan::New<v8::Integer>(cv::aruco::CornerRefineMethod::CORNER_REFINE_APRILTAG));
}

#endif