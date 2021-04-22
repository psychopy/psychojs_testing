// Modules 
const fs = require('fs-extra');

// Paths to temporary folders, image folders, and URLs
module.exports = {
  // Logs of karma; karma itself assumes this is path relative to one directory higher than the one containing karma.conf.js
  dir_results_karma:            './results/logs_karma',
  subdir_results_karma:          'logs_karma',

  // Path to staging directory (compiled test-experiments)
  dir_staging:                 './staging',
  dir_cache:                   './cache',

  // Logs wdio
  dir_results:                './results',  
  dir_results_capabilities:   './results/logs_capabilities',
  dir_results_json:           './results/logs_json',
  dir_results_joined:         './results/logs_joined',
  dir_results_processed:      './results/logs_processed',
  subdir_results_processed:   'logs_processed',    
  dir_results_wdio:           './results/logs_wdio',
  dir_results_selenium:       './results/logs_selenium',
  
  dir_screenshots_cutout:     './results/screenshots_cutout',
  dir_screenshots_raw:        './results/screenshots_raw',
  dir_screenshots_scaled:     './results/screenshots_scaled',  
  
  dir_tests:                  './tests',

  subdir_results_wdio:        'results_wdio',
  subdir_results_karma:       'results_karma',
  subdir_results_joined:      'results_joined',

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