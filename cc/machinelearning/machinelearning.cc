#include "opencv_modules.h"

#ifdef HAVE_OPENCV_ML

#include "ParamGrid.h"
#include "SVM.h"
#include "StatModel.h"
#include "TrainData.h"
#include "machinelearning.h"
#include "machinelearningConstants.h"

NAN_MODULE_INIT(MachineLearning::Init) {
  MachineLearningConstants::Init(target);
  TrainData::Init(target);
  ParamGrid::Init(target);
  StatModel::Init(target);
  SVM::Init(target);
};

#endif