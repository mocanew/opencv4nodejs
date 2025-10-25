#include "opencv_modules.h"

#ifdef HAVE_OPENCV_OBJDETECT

#include "ArucoDictionary.h"
#include "ArucoDictionaryBindings.h"

Nan::Persistent<v8::FunctionTemplate> ArucoDictionary::constructor;

NAN_MODULE_INIT(ArucoDictionary::Init) {
  v8::Local<v8::FunctionTemplate> ctor = Nan::New<v8::FunctionTemplate>(ArucoDictionary::New);
  v8::Local<v8::ObjectTemplate> instanceTemplate = ctor->InstanceTemplate();

  constructor.Reset(ctor);
  ctor->SetClassName(FF::newString("ArucoDictionary"));
  instanceTemplate->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(ctor, "generateImageMarker", GenerateImageMarker);
  Nan::SetPrototypeMethod(ctor, "generateImageMarkerAsync", GenerateImageMarkerAsync);
  Nan::SetPrototypeMethod(ctor, "identify", Identify);
  Nan::SetPrototypeMethod(ctor, "getDistanceToId", GetDistanceToId);

  Nan::SetMethod(ctor, "getPredefinedDictionary", GetPredefinedDictionary);

  Nan::Set(target, FF::newString("ArucoDictionary"), FF::getFunction(ctor));
};

NAN_METHOD(ArucoDictionary::New) {
  FF::TryCatch tryCatch("ArucoDictionary::New");
  FF_ASSERT_CONSTRUCT_CALL();
  ArucoDictionaryBindings::NewWorker worker;

  if (worker.applyUnwrappers(info)) {
    return tryCatch.reThrow();
  }

  ArucoDictionary* self = new ArucoDictionary();
  self->setNativeObject(cv::aruco::getPredefinedDictionary(worker.dictType));
  self->Wrap(info.Holder());
  info.GetReturnValue().Set(info.Holder());
}

NAN_METHOD(ArucoDictionary::GetPredefinedDictionary) {
  FF::TryCatch tryCatch("ArucoDictionary::GetPredefinedDictionary");
  
  if (!info[0]->IsNumber()) {
    return tryCatch.throwError("expected arg 0 to be a dictionary type (number)");
  }

  int dictType = (int)info[0]->NumberValue(Nan::GetCurrentContext()).ToChecked();
  
  v8::Local<v8::Object> jsDict = FF::newInstance(Nan::New(ArucoDictionary::constructor));
  ArucoDictionary* dict = Nan::ObjectWrap::Unwrap<ArucoDictionary>(jsDict);
  dict->setNativeObject(cv::aruco::getPredefinedDictionary(dictType));
  
  info.GetReturnValue().Set(jsDict);
}

NAN_METHOD(ArucoDictionary::GenerateImageMarker) {
  FF::executeSyncBinding(
    std::make_shared<ArucoDictionaryBindings::GenerateImageMarkerWorker>(ArucoDictionary::unwrapSelf(info)),
    "ArucoDictionary::GenerateImageMarker",
    info
  );
}

NAN_METHOD(ArucoDictionary::GenerateImageMarkerAsync) {
  FF::executeAsyncBinding(
    std::make_shared<ArucoDictionaryBindings::GenerateImageMarkerWorker>(ArucoDictionary::unwrapSelf(info)),
    "ArucoDictionary::GenerateImageMarkerAsync",
    info
  );
}

NAN_METHOD(ArucoDictionary::Identify) {
  FF::executeSyncBinding(
    std::make_shared<ArucoDictionaryBindings::IdentifyWorker>(ArucoDictionary::unwrapSelf(info)),
    "ArucoDictionary::Identify",
    info
  );
}

NAN_METHOD(ArucoDictionary::GetDistanceToId) {
  FF::executeSyncBinding(
    std::make_shared<ArucoDictionaryBindings::GetDistanceToIdWorker>(ArucoDictionary::unwrapSelf(info)),
    "ArucoDictionary::GetDistanceToId",
    info
  );
}

#endif