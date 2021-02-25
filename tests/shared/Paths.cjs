// Modules 
const fs = require('fs-extra');

// Paths to temporary folders, image folders, and URLs
module.exports = {
  // Logs of karma; karma itself assumes this is path relative to one directory higher than the one containing karma.conf.js
  dir_tmp_unit_karma:      '../tests/results/logs_karma', 
  dir_tmp_unit:            './tests/results/logs_karma',

  // Path to staging directory (compiled test-experiments)
  dir_staging:             './tests/staging',
  dir_cache:               './tests/cache',

  // Logs wdio
  dir_tmp_wdio:            './tests/results',  
  dir_logs_capabilities:   './tests/results/logs_capabilities',
  dir_logs_json:           './tests/results/logs_json',
  dir_logs_joined:         './tests/results/logs_joined',
  dir_logs_processed:      './tests/results/logs_processed',
  dir_logs_wdio:           './tests/results/logs_wdio',
  dir_logs_selenium:       './tests/results/logs_selenium',
  
  dir_screenshots_cutout:  './tests/results/screenshots_cutout',
  dir_screenshots_raw:     './tests/results/screenshots_raw',
  dir_screenshots_scaled:  './tests/results/screenshots_scaled',  
  
  dir_tests:               './tests',
  dir_counterexample_imgs: './tests/counterexample_imgs',

  subdir_logs_processed:   'logs_processed',
  subdir_report_wdio:      'report_wdio',
  subdir_report_unit:      'report_unit',

  cleanupTemporaryDirectories: function(pathsToClean) {
    for (let path of pathsToClean) {
      console.log('[Paths.cjs] Re-creating directory ' + path[0]);
      try {
        fs.removeSync(path[0]);
        fs.mkdirSync(path[0]);
      } catch {
        errorMessage = '[Paths.cjs] Could not delete file ' + file;
        console.log('\x1b[31m' + errorMessage + '\x1b[0m');
        throw new Error(errorMessage);            
      }
      /*
      if (!fs.existsSync(path[0])) {

        
      } else {
        // Only delete files if second element of path is true
        if (path[1]) {
          console.log('[Paths.cjs] Deleting files in directory ' + path[0]);
          files = fs.readdirSync(path[0]);
          for (let file of files) {
            
              fs.unlinkSync(path[0] + '/' + file);
            } catch (e) {
            }
          }
        }
      }
      */
    }
  }
};