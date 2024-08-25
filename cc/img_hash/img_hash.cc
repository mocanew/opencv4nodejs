#include "opencv_modules.h"

#ifdef HAVE_OPENCV_IMG_HASH

#include "PHash.h"
#include "img_hash.h"

NAN_MODULE_INIT(ImgHash::Init) {
  PHash::Init(target);
};

#endif
