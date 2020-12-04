const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
describe('single_test', () => {
  let test, testFunction;
  it('get_test', () => {
    console.log('[single_test.cjs] get test')
    test = browser.getTest();
    testFunction = require('../tests_e2e/' + test + '.cjs').run;
  });
  it(test, () => {
    console.log('[single_test.cjs] ' + test)
    testFunction();
  });
});