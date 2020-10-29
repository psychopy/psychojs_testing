// *** Modules
const fs = require('fs');
const json2csv = require('json2csv');

// Write a JSON array of objects to a JSON and CSV file
writeJsonAndCsv = (filePrefix, output) => {
  // Store output as JSON
  fs.writeFileSync(
    filePrefix + '.json',
    JSON.stringify(output)
  );

  // Store output as CSV
  fs.writeFileSync(
    filePrefix + '.csv',
    json2csv.parse(output)
  );
};

// Merges individual JSON report files to single JSON and csv file
// If specFrom is defined, replace spec entries with value specFrom to specTo
merge = (suiteFrom = [], suiteTo = undefined) => {
  // *** Functions
  // Add an entry to output, prefilling specfile_id and capability_id
  log = (suite, spec, state, message, duration) => {
    if (suiteFrom.includes(suite)) {
      suite = suiteTo;
    }
    output.push(
      {
        capability_id: capability_id,      
        specfile_id: specfile_id,
        suite: suite,
        spec: spec,
        state: state,
        message: message,
        duration: duration
      }
    );
  };

  // *** Process JSON reporter files
  // Path to JSON reporter logs
  let pathIn = '.tmp/json_logs';
  // Path to processed logs
  let pathOut = '.tmp/processed_logs';
  // List of JSON reporter log filenames
  let filenames = fs.readdirSync(pathIn).sort();
  // Converted logs
  let output = [];
  // Raw JSON reporter log
  let json;
  // Specfile and capability ID (numbered 0 to X)
  let specfile_id;
  let capability_id;

  // Convert each JSON reporter log file
  console.log('ReportSummarizer.js: found ' + filenames.length + ' JSON logs');
  for (let filename of filenames) {
    // Read and parse file to JSON
    try {
      json = JSON.parse(
        fs.readFileSync(pathIn + '/' + filename).toString()
      );
    } catch (e) {
      console.log(e);
    }
    console.log('ReportSummarizer.js: read ' + filename);
    // Set specfile_id and capability_id from filename
    filename = filename.split('.')[0]
    filename = filename.split('-');
    capability_id = Number(filename[1]);
    specfile_id = Number(filename[2]);  
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
  }
  // Store merged reports
  writeJsonAndCsv(pathOut + '/' + 'report', output);
};

// Summarize output, add custom entries present in customLog
summarize = (output, customLogsToAdd) => {
  console.log('ReportSummarizer.js: summarizing');

  // *** Summarize output
  // Summarized output
  let summaries = [];
  // List with each unique capability ID
  let capabilities;
  // Filtered logs
  let customLogs;

  // Extract unique capability IDs from output
  capabilities = output.map((row) => {
    return row.capability_id;
  });
  capabilities = Int8Array.from(new Set(capabilities)).sort();
  // For each unique capability, aggregate data
  for(let capability of capabilities) {
    summary = {};
    // Add capability_id
    summary.capability_id = capability;
    // Add customLogs
    customLogs = output.filter(function (row) {
      return row.capability_id === capability && row.state === 'custom' && customLogsToAdd.includes(row.spec)
    });
    for (let customLog of customLogs) {
      summary[customLog.specfile_id + '.' + customLog.spec] = customLog.message
    }
    // Count passed, failed, skipped
    for (let state of ['passed', 'failed', 'skipped']) {
      summary[state] = output.filter(function (row) {
        return row.capability_id === capability && row.state === state
      }).length;
    }
    // Append all failed specs to a space-separated string
    summary.failed_specs = 
      output.filter(function (row) {
        return row.capability_id === capability && row.state === 'failed'
      }).map(function(row) {
        return row.suite;
      }).join(' ');

    // Add to summaries
    summaries.push(summary);
  }
  return summaries;
};

// Reads in each json reporter logs and aggrates them
module.exports = { 
  writeJsonAndCsv: writeJsonAndCsv,
  merge: merge,
  summarize: summarize
};