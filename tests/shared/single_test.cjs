const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
describe('single_test', () => {
  let test, testFunction;
  it('get_test', () => {
    console.log('[single_test.cjs] get_test')
    test = browser.getTest();
    testFunction = require('../tests_wdio/' + test + '.cjs').run;
  });
  it('run_test', () => {
    console.log('[single_test.cjs] ' + test)
    testFunction();
  });
});