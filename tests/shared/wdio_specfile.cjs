const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
const TestCollector = require('../shared/TestCollector.cjs');
const CLIParser = require('../shared/CLIParser.cjs');

// Get label and construct tests
let label = parseOption({cli: 'label'});
let tests = TestCollector.collectTests(label);
console.log('[all_tests.cjs] tests are ' + JSON.stringify(tests));

describe('wdio_specfile', () => {
  let calibration, testFunction;
  // Fine calibration required? Run calibration experiment
  if (tests.fine_calibration) {
    it('e2e_calibration', () => {
      console.log('[all_tests.cjs] e2e_calibration');
      calibration = SharedBehaviors.performCalibrationExperiment();
    });
  }
  // Run each test
  for (let test of tests.wdio) {
    it(TestCollector.testNameFromPath(test), () => {
      console.log('[all_tests.cjs] ' + TestCollector.testNameFromPath(test));
      testFunction = require(test).run;      
      testFunction(calibration);
    });
  }
});
