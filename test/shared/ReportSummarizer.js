// *** Modules
const fs = require('fs');
const json2csv = require('json2csv');
const XLSX = require('xlsx');
const Paths = require('./Paths.js');

// Write a JSON array to a JSON and CSV file
writeJsonAndCsv = (filePrefix, output) => {
  // Store output as JSON
  fs.writeFileSync(
    filePrefix + '.json',
    JSON.stringify(output)
  );
  // Store output as CSV (if any output exists)
  if (output.length > 0) {
    fs.writeFileSync(
      filePrefix + '.csv',
      json2csv.parse(output)
    );
  }
};

// Write an object of JSON arrays to an XLSX file
// Each property of output becomes a separate sheet in the XLSX
writeXLSX = (filename, output) => {
  // Create workbook
  let wb = XLSX.utils.book_new();
  // Append each sheet
  for (output_i in output) {
    XLSX.utils.book_append_sheet(
      wb, 
      XLSX.utils.json_to_sheet(output[output_i]),
      output_i
    );
  }
  XLSX.writeFile(wb, filename);
};

// Merges individual JSON report files to a tabular data structure
// Each row in the result for which suite matches an element of suiteFrom,
// suite gets replaced by suiteTo
merge = (suiteFrom = [], suiteTo = undefined) => {
  // *** Functions
  // Add an entry to joinedReports, prefilling specfile_id and capability_id
  log = (suite, spec, state, message, duration) => {
    if (suiteFrom.includes(suite)) {
      suite = suiteTo;
    }
    joinedReports.push(
      {
        capability_id: capability_id,      
        specfile_id: specfile_id,
        suite: suite,
        spec: spec,
        state: state,
        duration: duration,
        message: message
      }
    );
  };

  // *** Process JSON reporter files
  // List of JSON reporter log filenames
  let filenames = fs.readdirSync(Paths.dir_logs_json).sort();
  // Converted logs
  let joinedReports = [];
  // Raw JSON reporter log
  let json;
  // Specfile and capability ID (numbered 0 to X)
  let specfile_id;
  let capability_id;
  // Filename split to array
  let splitFilename;
  // Number of logs we couldn't process
  let failedLogs = 0;

  // Convert each JSON reporter log file
  console.log('ReportSummarizer.js: found ' + filenames.length + ' JSON logs');
  for (let filename of filenames) {
    // Set specfile_id and capability_id from filename
    splitFilename = filename.split('.')[0]
    splitFilename = splitFilename.split('-');
    capability_id = Number(splitFilename[1]);
    specfile_id = Number(splitFilename[2]);  
    // Read and parse file to JSON
    try {
      json = JSON.parse(
        fs.readFileSync(Paths.dir_logs_json + '/' + filename).toString()
      );
      console.log('ReportSummarizer.js: read ' + filename);
      // Add sessionId
      log('custom', 'sessionId', 'custom', json.capabilities.sessionId, "");
      // Add browserName
      log('custom', 'browserName', 'custom', json.capabilities.browserName, "");
      // Add custom logs
      for (let customLogKey in json.capabilities.customLogs) {
        log('custom', customLogKey, 'custom', json.capabilities.customLogs[customLogKey], "");
      }
      // Add suites and specs
      for (let suite of json.suites) {
        suiteName = suite.name;
        for (let test of suite.tests) {
          log(suiteName, test.name, test.state, test.state === 'passed'? '': test.error, test.duration);
        }
      }
    } catch (e) {
      console.log('ReportSummarizer.js: error reading ' + filename + ' (' + e.message + ')');
      failedLogs++;
    }
  }
  // *** Add entries for logs we couldn't process; these should add up to the number of platforms not present in processed lgos
  // Read capabilities
  capabilities = JSON.parse(
    fs.readFileSync(Paths.dir_logs_capabilities + '/capabilities.json').toString()
  );  
  // allPlatforms; all those found in capabilities
  let allPlatforms = capabilities.map((capability) => {
    return capability['bstack:options'].sessionName;
  });
  // processedPlatforms; those we found in processed logs
  let processedPlatforms = joinedReports.filter((joinedReport) => {
    return joinedReport.spec == 'platform'
  }).map( (joinedReport) => {
    return joinedReport.message
  });
  // platforms not present in processed logs
  let unprocessedPlatforms = allPlatforms.filter((platform) => {
    return !processedPlatforms.includes(platform);
  });
  console.log(
    'ReportSummarizer.js: found ' + failedLogs + ' JSON logs that could not be processed and ' + unprocessedPlatforms.length + ' platforms without processed logs. ' +
    'These are ' + JSON.stringify(unprocessedPlatforms)
  );
  // Add 'no_logs' entries for unprocessed platforms
  specfile_id = 'none';
  for (i = 0; i < unprocessedPlatforms.length; i++){
    capability_id = 'none_' + i;
    log('custom', 'platform', 'custom', unprocessedPlatforms[i], '');
    log('', 'process_logs', 'failed', 'Could not process JSON logs', '');  
  }

  // Return merged reports
  return joinedReports;
};

// Summarize joinedReports, add custom entries present in customLogsToAdd
summarize = (joinedReports, customLogsToAdd) => {
  console.log('ReportSummarizer.js: summarizing');
  // Summarized joinedReports
  let summaries = [];
  // List with each unique capability ID
  let capabilities;
  // Filtered logs
  let customLogs;
  // Extract unique capability IDs from joinedReports
  capabilities = joinedReports.map((row) => {
    return row.capability_id;
  });
  capabilities = Array.from(new Set(capabilities));
  // List of failed tests per capability
  let failedTests;
  // For each unique capability, aggregate data
  for(let capability of capabilities) {
    summary = {};
    // Add capability_id
    summary.capability_id = capability;
    // Add customLogs
    customLogs = joinedReports.filter(function (row) {
      return row.capability_id === capability && row.state === 'custom' && customLogsToAdd.includes(row.spec)
    });
    for (let customLog of customLogs) {
      summary[customLog.spec] = customLog.message
    }
    // Count passed, failed, skipped
    for (let state of ['passed', 'failed', 'skipped']) {
      summary[state] = joinedReports.filter(function (row) {
        return row.capability_id === capability && row.state === state
      }).length;
    }
    // All failed tests of this capability
    failedTests = joinedReports.filter(function (row) {
      return row.capability_id === capability && row.state === 'failed'
    });
    // Append all failed specs to a space-separated string
    summary.failed_specs = failedTests.map(function(row) {
      return row.spec;
    }).join(' ');
    // Append messages of failed specs to a space-separated string
    summary.messages = failedTests.map(function(row) {
      return row.message;
    }).join(' ');

    // Add to summaries
    summaries.push(summary);
  }
  return summaries;
};

module.exports = { 
  writeJsonAndCsv: writeJsonAndCsv,
  writeXLSX: writeXLSX,
  merge: merge,
  summarize: summarize
};