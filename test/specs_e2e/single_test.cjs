const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
describe('single_test', () => {
  let test, testFunction;
  it('get_test', () => {
    test = browser.getTest();
    if (test === 'e2e_calibration') {
      testFunction = SharedBehaviors.e2e_calibration;
    } else if (test in SharedBehaviors.tests) {
      testFunction = SharedBehaviors.tests[test];
    } else {
      console.log('CLI argument (' + test + ') was recognized as test, but no corresponding function was found in SharedBehaviors.tests');
      process.exit(1);      
    }
  })
  it(test, () => {
    testFunction();
  });
});