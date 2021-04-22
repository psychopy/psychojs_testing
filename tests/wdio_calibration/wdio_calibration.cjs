const SharedBehaviors = require('../../scripts/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    SharedBehaviors.performCalibrationExperiment(true);
  }
};