#include "ArucoDetector.h"
#include "ArucoDictionary.h"

#ifndef __FF_ARUCODETECTORBINDINGS_H_
#define __FF_ARUCODETECTORBINDINGS_H_

namespace ArucoDetectorBindings {

struct NewWorker : CatchCvExceptionWorker {
public:
  cv::aruco::Dictionary dictionary;
  bool hasDictionary = false;

  bool unwrapOptionalArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    if (info.Length() > 0 && ArucoDictionary::hasInstance(info[0])) {
      dictionary = ArucoDictionary::Converter::unwrapUnchecked(info[0]);
      hasDictionary = true;
    }
    return false;
  }

  std::string executeCatchCvExceptionWorker() {
    return "";
  }
};

struct DetectMarkersWorker : CatchCvExceptionWorker {
public:
  cv::aruco::ArucoDetector detector;

  DetectMarkersWorker(cv::aruco::ArucoDetector detector) {
    this->detector = detector;
  }

  cv::Mat image;

  std::vector<std::vector<cv::Point2f>> corners;
  std::vector<int> ids;
  std::vector<std::vector<cv::Point2f>> rejectedImgPoints;

  std::string executeCatchCvExceptionWorker() {
    detector.detectMarkers(image, corners, ids, rejectedImgPoints);
    return "";
  }

  v8::Local<v8::Value> getReturnValue() {
    v8::Local<v8::Object> ret = Nan::New<v8::Object>();
    
    // Convert corners (vector of vector of Point2f)
    v8::Local<v8::Array> cornersArray = Nan::New<v8::Array>(corners.size());
    for (size_t i = 0; i < corners.size(); i++) {
      v8::Local<v8::Array> markerCorners = Nan::New<v8::Array>(corners[i].size());
      for (size_t j = 0; j < corners[i].size(); j++) {
        v8::Local<v8::Object> point = Nan::New<v8::Object>();
        Nan::Set(point, FF::newString("x"), Nan::New(corners[i][j].x));
        Nan::Set(point, FF::newString("y"), Nan::New(corners[i][j].y));
        Nan::Set(markerCorners, (uint32_t)j, point);
      }
      Nan::Set(cornersArray, (uint32_t)i, markerCorners);
    }
    
    Nan::Set(ret, FF::newString("corners"), cornersArray);
    Nan::Set(ret, FF::newString("ids"), FF::IntArrayConverter::wrap(ids));
    
    // Convert rejected corners
    v8::Local<v8::Array> rejectedArray = Nan::New<v8::Array>(rejectedImgPoints.size());
    for (size_t i = 0; i < rejectedImgPoints.size(); i++) {
      v8::Local<v8::Array> rejectedCorners = Nan::New<v8::Array>(rejectedImgPoints[i].size());
      for (size_t j = 0; j < rejectedImgPoints[i].size(); j++) {
        v8::Local<v8::Object> point = Nan::New<v8::Object>();
        Nan::Set(point, FF::newString("x"), Nan::New(rejectedImgPoints[i][j].x));
        Nan::Set(point, FF::newString("y"), Nan::New(rejectedImgPoints[i][j].y));
        Nan::Set(rejectedCorners, (uint32_t)j, point);
      }
      Nan::Set(rejectedArray, (uint32_t)i, rejectedCorners);
    }
    
    Nan::Set(ret, FF::newString("rejectedImgPoints"), rejectedArray);
    
    return ret;
  }

  bool unwrapRequiredArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return Mat::Converter::arg(0, &image, info);
  }
};

} // namespace ArucoDetectorBindings

#endif