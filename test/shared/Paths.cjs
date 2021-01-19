// Modules 
const fs = require('fs');

// Paths to temporary folders, image folders, and URLs
module.exports = {
  dir_tmp_unit:            './.tmp_unit',
  dir_tmp_e2e:             './.tmp_e2e',
  dir_tmp_browsers:        './.tmp_browsers',
  dir_logs_capabilities:   './.tmp_e2e/logs_capabilities',
  dir_logs_json:           './.tmp_e2e/logs_json',
  dir_logs_joined:         './.tmp_e2e/logs_joined',
  dir_logs_processed:      './.tmp_e2e/logs_processed',
  subdir_logs_processed:   'logs_processed',
  dir_logs_wdio:            './.tmp_e2e/logs_wdio',
  dir_logs_selenium:       './.tmp_e2e/logs_selenium',
  
  dir_screenshots_cutout:  './.tmp_e2e/screenshots_cutout',
  dir_screenshots_raw:     './.tmp_e2e/screenshots_raw',
  dir_screenshots_scaled:  './.tmp_e2e/screenshots_scaled',  
  
  dir_experiments:         './.tmp_experiments',
  
  dir_counterexample_imgs: './test/counterexample_imgs',

  subdir_report_e2e:       'report_e2e',
  subdir_report_unit:      'report_unit',

  cleanupTemporaryDirectories: function(pathsToClean) {
    for (let path of pathsToClean) {
      if (!fs.existsSync(path[0])) {
        console.log('[Paths.cjs] Creating directory ' + path[0]);
        fs.mkdirSync(path[0]);
      } else {
        // Only delete files if second element of path is true
        if (path[1]) {
          console.log('[Paths.cjs] Deleting files in directory ' + path[0]);
          files = fs.readdirSync(path[0]);
          for (let file of files) {
            try {
              fs.unlinkSync(path[0] + '/' + file);
            } catch (e) {
              errorMessage = '[Paths.cjs] Could not delete file ' + file;
              console.log('\x1b[31m' + errorMessage + '\x1b[0m');
              throw new Error(errorMessage);            
            }
          }
        }
      }
    }
  }
};