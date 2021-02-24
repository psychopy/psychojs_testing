const SharedBehaviors = require('../../shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    SharedBehaviors.performCalibrationExperiment(true);
  }
};