const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
describe('all_tests', () => {
  let calibration;
  it('e2e_calibration', () => {
    console.log('e2e_calibration');
    calibration = SharedBehaviors.e2e_calibration();
  });
  for (let testName in SharedBehaviors.tests) {
    it(testName, () => {
      console.log(testName);
      SharedBehaviors.tests[testName](calibration);
    });
  }
});
