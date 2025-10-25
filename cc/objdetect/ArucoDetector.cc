#include "opencv_modules.h"

#ifdef HAVE_OPENCV_OBJDETECT

#include "ArucoDetector.h"
#include "ArucoDetectorBindings.h"

Nan::Persistent<v8::FunctionTemplate> ArucoDetector::constructor;

NAN_MODULE_INIT(ArucoDetector::Init) {
  v8::Local<v8::FunctionTemplate> ctor = Nan::New<v8::FunctionTemplate>(ArucoDetector::New);
  v8::Local<v8::ObjectTemplate> instanceTemplate = ctor->InstanceTemplate();

  constructor.Reset(ctor);
  ctor->SetClassName(FF::newString("ArucoDetector"));
  instanceTemplate->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(ctor, "detectMarkers", DetectMarkers);
  Nan::SetPrototypeMethod(ctor, "detectMarkersAsync", DetectMarkersAsync);
  Nan::SetPrototypeMethod(ctor, "refineDetectedMarkers", RefineDetectedMarkers);
  Nan::SetPrototypeMethod(ctor, "refineDetectedMarkersAsync", RefineDetectedMarkersAsync);

  Nan::Set(target, FF::newString("ArucoDetector"), FF::getFunction(ctor));
};

NAN_METHOD(ArucoDetector::New) {
  FF::TryCatch tryCatch("ArucoDetector::New");
  FF_ASSERT_CONSTRUCT_CALL();
  ArucoDetectorBindings::NewWorker worker;

  if (worker.applyUnwrappers(info)) {
    return tryCatch.reThrow();
  }

  ArucoDetector* self = new ArucoDetector();
  
  if (worker.hasDictionary) {
    self->setNativeObject(cv::aruco::ArucoDetector(worker.dictionary));
  } else {
    self->setNativeObject(cv::aruco::ArucoDetector());
  }
  
  self->Wrap(info.Holder());
  info.GetReturnValue().Set(info.Holder());
}

NAN_METHOD(ArucoDetector::DetectMarkers) {
  FF::executeSyncBinding(
    std::make_shared<ArucoDetectorBindings::DetectMarkersWorker>(ArucoDetector::unwrapSelf(info)),
    "ArucoDetector::DetectMarkers",
    info
  );
}

NAN_METHOD(ArucoDetector::DetectMarkersAsync) {
  FF::executeAsyncBinding(
    std::make_shared<ArucoDetectorBindings::DetectMarkersWorker>(ArucoDetector::unwrapSelf(info)),
    "ArucoDetector::DetectMarkersAsync",
    info
  );
}

NAN_METHOD(ArucoDetector::RefineDetectedMarkers) {
  // Placeholder - would need Board implementation
  Nan::ThrowError("RefineDetectedMarkers not yet implemented - requires Board class");
}

NAN_METHOD(ArucoDetector::RefineDetectedMarkersAsync) {
  // Placeholder - would need Board implementation
  Nan::ThrowError("RefineDetectedMarkersAsync not yet implemented - requires Board class");
}

#endif