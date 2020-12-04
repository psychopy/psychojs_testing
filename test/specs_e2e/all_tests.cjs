const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
describe('all_tests', () => {
  let calibration, testFunction;
  it('e2e_calibration', () => {
    console.log('[all_tests.cjs] e2e_calibration');
    calibration = SharedBehaviors.performCalibrationExperiment();
  });
  for (let test of SharedBehaviors.tests) {
    it(test, () => {
      console.log('[all_tests.cjs] ' + test);
      testFunction = require('../tests_e2e/' + test + '.cjs').run;      
      testFunction(calibration);
    });
  }
});
