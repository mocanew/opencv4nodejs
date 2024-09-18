#include "opencv_modules.h"

#ifdef HAVE_OPENCV_TRACKING

#include "TrackerNano.h"

#if CV_VERSION_GREATER_EQUAL(3, 2, 0)

Nan::Persistent<v8::FunctionTemplate> TrackerNano::constructor;

#if CV_VERSION_GREATER_EQUAL(4, 5, 2)

NAN_METHOD(TrackerNano::Clear) {
}

NAN_METHOD(TrackerNano::Init) {
  FF::TryCatch tryCatch("TrackerNano::Init");
  cv::Mat image;
  cv::Rect2d boundingBox;
  if (
      Mat::Converter::arg(0, &image, info) || Rect::Converter::arg(1, &boundingBox, info)) {
    return tryCatch.reThrow();
  }

  TrackerNano::unwrapThis(info)->getTracker()->init(image, boundingBox);
}

NAN_METHOD(TrackerNano::Update) {
  FF::TryCatch tryCatch("TrackerNano::Update");
  cv::Mat image;
  if (Mat::Converter::arg(0, &image, info)) {
    return tryCatch.reThrow();
  }

  cv::Rect rect;
  bool ret = false;

  try {
    ret = TrackerNano::unwrapThis(info)->getTracker()->update(image, rect);
  } catch (std::exception& e) {
    return tryCatch.throwError(e.what());
  }

  if (ret) {
    info.GetReturnValue().Set(Rect::Converter::wrap(rect));
  } else {
    info.GetReturnValue().Set(Nan::Null());
  }
}

NAN_METHOD(TrackerNano::GetModel) {
  // TBD
}

#endif

NAN_MODULE_INIT(TrackerNano::Init) {
  v8::Local<v8::FunctionTemplate> ctor = Nan::New<v8::FunctionTemplate>(TrackerNano::New);
  v8::Local<v8::ObjectTemplate> instanceTemplate = ctor->InstanceTemplate();

#if CV_VERSION_GREATER_EQUAL(4, 5, 2)
  Nan::SetPrototypeMethod(ctor, "clear", TrackerNano::Clear);
  Nan::SetPrototypeMethod(ctor, "init", TrackerNano::Init);
  Nan::SetPrototypeMethod(ctor, "update", TrackerNano::Update);
  Nan::SetPrototypeMethod(ctor, "getModel", TrackerNano::GetModel);
#else
  Tracker::Init(ctor);
#endif
  constructor.Reset(ctor);
  ctor->SetClassName(FF::newString("TrackerNano"));
  instanceTemplate->SetInternalFieldCount(1);

  Nan::Set(target, FF::newString("TrackerNano"), FF::getFunction(ctor));
};

NAN_METHOD(TrackerNano::New) {
  FF::TryCatch tryCatch("TrackerNano::New");
  FF_ASSERT_CONSTRUCT_CALL();

  TrackerNano* self = new TrackerNano();
#if CV_VERSION_GREATER_EQUAL(3, 3, 0)
  self->tracker = cv::TrackerNano::create();
#else
  self->tracker = cv::TrackerNano::createTracker();
#endif

  self->Wrap(info.Holder());
  info.GetReturnValue().Set(info.Holder());
};

#endif

#endif
