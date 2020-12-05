const SharedBehaviors = require('../shared/SharedBehaviors.cjs');

module.exports = {
  run: (calibration = null) => {
    SharedBehaviors.performCalibrationExperiment(true);
  }
};