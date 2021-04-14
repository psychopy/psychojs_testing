// Modules 
const fs = require('fs-extra');

// Paths to temporary folders, image folders, and URLs
module.exports = {
  // Logs of karma; karma itself assumes this is path relative to one directory higher than the one containing karma.conf.js
  dir_results_karma:            './tests/results/logs_karma',

  // Path to staging directory (compiled test-experiments)
  dir_staging:                 './tests/staging',
  dir_cache:                   './tests/cache',

  // Logs wdio
  dir_results:                './tests/results',  
  dir_results_capabilities:   './tests/results/logs_capabilities',
  dir_results_json:           './tests/results/logs_json',
  dir_results_joined:         './tests/results/logs_joined',
  dir_results_processed:      './tests/results/logs_processed',
  dir_results_wdio:           './tests/results/logs_wdio',
  dir_results_selenium:       './tests/results/logs_selenium',
  
  dir_screenshots_cutout:     './tests/results/screenshots_cutout',
  dir_screenshots_raw:        './tests/results/screenshots_raw',
  dir_screenshots_scaled:     './tests/results/screenshots_scaled',  
  
  dir_tests:                  './tests',
  dir_counterexample_imgs:    './tests/counterexample_imgs',

  subdir_logs_processed:      'logs_processed',
  subdir_logs_karma:          'logs_karma',
  subdir_results:             'results',
  subdir_results_wdio:        'results_wdio',
  subdir_results_karma:       'results_karma',

  // Recreates directories in paths. The argument remove determines 
  // whether a directory should (true) be deleted and then created again or
  // (false) only should be created if it doesn't exist yet.
  recreateDirectories: function(paths, remove) {
    for (let path of paths) {
      console.log('[Paths.cjs] Re-creating directory ' + path);
      try {
        if (remove) {
          fs.removeSync(path);
        }
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
      } catch (e) {
        throw new Error('[Paths.cjs] Could not re-create directory ' + path + ', because ' + e.message);            
      }
    }
  }
};