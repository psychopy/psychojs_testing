const SharedBehaviors = require('../shared/SharedBehaviors.cjs');
const TestCollector = require('../shared/TestCollector.cjs');
const CLIParser = require('../shared/CLIParser.cjs');

// Get label and construct tests
let label = parseOption({cli: 'label'});
let tests = TestCollector.collectTests(label);
console.log('[wdio_specfile.cjs] Running ' + tests.wdio.length + ' tests');

describe('wdio_specfile', () => {
  let calibration, testFunction;
  // Fine calibration required? Run calibration experiment
  if (tests.fine_calibration) {
    it('e2e_calibration', () => {
      let calibrationTest = TestCollector.collectTests('e2e_calibration').wdio[0];
      browser.setTestConfig(calibrationTest);
      console.log('[wdio_specfile.cjs] ' + calibrationTest.path);
      calibration = SharedBehaviors.performCalibrationExperiment();
    });
  }
  // Run each test
  for (let test of tests.wdio) {
    it(test.path, () => {
      console.log('[wdio_specfile.cjs] ' + test.path);
      browser.setTestConfig(test);
      testFunction = require('../' + test.path + '/' + test.testscript_file).run;
      testFunction(calibration);
    });
  }
});
