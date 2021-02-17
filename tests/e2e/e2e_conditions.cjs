const SharedBehaviors = require('../../tests/shared/SharedBehaviors.cjs');

module.exports = {
  run: () => {
    // Navigate to experiment and perform prelude
    browser.url(SharedBehaviors.getExperimentUrl('e2e_conditions'));
    let calibration = SharedBehaviors.performPavloviaPrelude();
    // Check successive data-report values
    let reportValues = [
      'intro_general',
      'intro_random_csv',
      '0_4',
      '1_2',
      '2_3',
      '3_1',
      'intro_random_xlsx',
      '4_B',
      '5_A',
      '6_A',
      '7_B',
      'intro_random_funky',
      '8_2',
      '9_1',
      '10_1',
      '11_2',
      '12_1',
      '13_2'    
    ];
    for (reportValue of reportValues) {
      SharedBehaviors.waitForReport(reportValue);
      SharedBehaviors.tapAtCoordinate(calibration.transformX(0), calibration.transformY(0));
    }
    // Check if experiment finishes
    SharedBehaviors.waitForReport("FINISHED");
  }
};