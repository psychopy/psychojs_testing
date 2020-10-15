const SharedBehaviors = require('../shared/SharedBehaviors');
describe('single_test', () => {
  let testOverride, testFunction;
  it('get_testOverride', () => {
    testOverride = browser.getTestOverride();
    if (testOverride === 'e2e_calibration') {
      testFunction = SharedBehaviors.e2e_calibration;
    } else if (testOverride in SharedBehaviors.tests) {
      testFunction = SharedBehaviors.tests[testOverride];
    } else {
      console.log('CLI argument (' + testOverride + ') was recognized as testOverride, but no corresponding function was found in SharedBehaviors.tests');
      process.exit(1);      
    }
  })
  it(testOverride, () => {
    testFunction();
  });
});