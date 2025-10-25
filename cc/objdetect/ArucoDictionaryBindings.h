#include "ArucoDictionary.h"

#ifndef __FF_ARUCODICTIONARYBINDINGS_H_
#define __FF_ARUCODICTIONARYBINDINGS_H_

namespace ArucoDictionaryBindings {

struct NewWorker : CatchCvExceptionWorker {
public:
  int dictType = cv::aruco::DICT_4X4_50;

  bool unwrapOptionalArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return FF::IntConverter::optArg(0, &dictType, info);
  }

  std::string executeCatchCvExceptionWorker() {
    return "";
  }
};

struct GenerateImageMarkerWorker : CatchCvExceptionWorker {
public:
  cv::aruco::Dictionary dictionary;

  GenerateImageMarkerWorker(cv::aruco::Dictionary dictionary) {
    this->dictionary = dictionary;
  }

  int id;
  int sidePixels;
  int borderBits = 1;

  cv::Mat img;

  std::string executeCatchCvExceptionWorker() {
    dictionary.generateImageMarker(id, sidePixels, img, borderBits);
    return "";
  }

  v8::Local<v8::Value> getReturnValue() {
    return Mat::Converter::wrap(img);
  }

  bool unwrapRequiredArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return (
      FF::IntConverter::arg(0, &id, info) ||
      FF::IntConverter::arg(1, &sidePixels, info)
    );
  }

  bool unwrapOptionalArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return FF::IntConverter::optArg(2, &borderBits, info);
  }
};

struct IdentifyWorker : CatchCvExceptionWorker {
public:
  cv::aruco::Dictionary dictionary;

  IdentifyWorker(cv::aruco::Dictionary dictionary) {
    this->dictionary = dictionary;
  }

  cv::Mat onlyBits;
  double maxCorrectionRate = 0.6;

  int idx = -1;
  int rotation = -1;
  bool identified = false;

  std::string executeCatchCvExceptionWorker() {
    identified = dictionary.identify(onlyBits, idx, rotation, maxCorrectionRate);
    return "";
  }

  v8::Local<v8::Value> getReturnValue() {
    v8::Local<v8::Object> ret = Nan::New<v8::Object>();
    Nan::Set(ret, FF::newString("identified"), Nan::New(identified));
    Nan::Set(ret, FF::newString("idx"), Nan::New(idx));
    Nan::Set(ret, FF::newString("rotation"), Nan::New(rotation));
    return ret;
  }

  bool unwrapRequiredArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return Mat::Converter::arg(0, &onlyBits, info);
  }

  bool unwrapOptionalArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return FF::DoubleConverter::optArg(1, &maxCorrectionRate, info);
  }
};

struct GetDistanceToIdWorker : CatchCvExceptionWorker {
public:
  cv::aruco::Dictionary dictionary;

  GetDistanceToIdWorker(cv::aruco::Dictionary dictionary) {
    this->dictionary = dictionary;
  }

  cv::Mat bits;
  int id;
  bool allRotations = true;

  int distance = 0;

  std::string executeCatchCvExceptionWorker() {
    distance = dictionary.getDistanceToId(bits, id, allRotations);
    return "";
  }

  v8::Local<v8::Value> getReturnValue() {
    return Nan::New(distance);
  }

  bool unwrapRequiredArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return (
      Mat::Converter::arg(0, &bits, info) ||
      FF::IntConverter::arg(1, &id, info)
    );
  }

  bool unwrapOptionalArgs(Nan::NAN_METHOD_ARGS_TYPE info) {
    return FF::BoolConverter::optArg(2, &allRotations, info);
  }
};

} // namespace ArucoDictionaryBindings

#endif