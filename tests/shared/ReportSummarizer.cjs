// *** Modules
const fs = require('fs-extra');
const json2csv = require('json2csv');
const XLSX = require('xlsx');
const Paths = require('./Paths.cjs');
//const BrowserStack = require('./BrowserStack.cjs');

// Write a JSON array to a JSON and CSV file
writeJsonAndCsv = (filePrefix, output) => {
  // Store output as JSON
  fs.outputFileSync(
    filePrefix + '.json',
    JSON.stringify(output)
  );
  // Store output as CSV (if any output exists)
  let csvOutput = output.length > 0? json2csv.parse(output): '';
  fs.outputFileSync(
    filePrefix + '.csv',
    csvOutput
  );
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

// Merges JSON file produced by karma's JSON reporter into a tabular data structure
mergeKarma = (onBrowserStack) => {
  joinedReports = [];
  // *** Functions
  // Add an entry to joinedReports, prefilling specfile_id and capability_id
  log = (suite, spec, state, message, duration) => {
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
  // If on browserStack, read sessions and create map from browser.id to platform and url
  let sessionMap = {}
  if (onBrowserStack) {
    let sessions = JSON.parse(
      fs.readFileSync(Paths.dir_tmp_unit + '/sessions.json').toString()
    );  
    let splitName, logUrl;
    for (let session of sessions) {
      splitName = JSON.parse(session.automation_session.name);
      logUrl = session.automation_session.public_url.split('?')[0];
      sessionMap[splitName[1]] = {
        platform: splitName[0],
        logUrl: logUrl
      }
    }
  }
  // Read JSON file with karma logs
  let json = JSON.parse(
    //fs.readFileSync(Paths.dir_tmp_unit + '/results.json').toString()
    fs.readFileSync(Paths.dir_tmp_unit + '/results.json').toString()
  );  
  // Capability_ids: browser IDs
  let capability_ids = Object.keys(json.browsers);
  let specfile_id, suite, state;
  for (capability_id of capability_ids) {
    for (specfile of json.result[capability_id]) {
      specfile_id = specfile.id;
      // Should have one suite per specfile
      if (specfile.suite.length > 1) {
        throw '[ReportSummarizer.cjs] capability ' + capability_id + ' and specfile_id ' + specfile_id + ' had more than 1 suite';
      }
      suite = specfile.suite[0];
      // Add platform
      if (onBrowserStack) {
        log(
          suite,
          'platform',
          'custom',
          sessionMap[capability_id].platform,
          ''
        );
        log(
          suite,
          'logUrl',
          'custom',
          sessionMap[capability_id].logUrl,
          ''
        );
      } else {
        log(
          suite,
          'platform',
          'custom',
          json.browsers[capability_id].name,
          ''
        );
      }
      // Decide whether this spec passed, failed, or skipped
      if (specfile.skipped) {
        state = 'skipped';
      } else if (specfile.success) {
        state = 'passed';
      } else {
        state = 'failed';
      }
      if (state !== 'failed') {
        // If not failed, add a single entry
        log(
          suite,
          specfile.description,
          state,
          '',
          specfile.time
        );
      } else {
        // Else, one row per message
        for (let logMessage of specfile.log) {
          log(
            suite,
            specfile.description,
            state,
            state !== 'failed'? '': logMessage,
            specfile.time
          );
        }
      }
    }
  }
  return joinedReports;
}

// Merges individual JSON files procuded by webdriverIO's JSON reporter into a tabular data structure
// Each row in the result for which suite matches an element of suiteFrom,
// suite gets replaced by suiteTo
mergeWdio = (suiteFrom = [], suiteTo = 'unnamed_suite') => {
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
  console.log('[ReportSummarizer.cjs] found ' + filenames.length + ' JSON logs');
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
      console.log('[ReportSummarizer.cjs] read ' + filename);
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
      console.log('[ReportSummarizer.cjs] error reading ' + filename + ' (' + e.message + ')');
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
    '[ReportSummarizer.cjs] found ' + failedLogs + ' JSON logs that could not be processed and ' + unprocessedPlatforms.length + ' platforms without processed logs. ' +
    'These are ' + JSON.stringify(unprocessedPlatforms)
  );
  // Add 'no_logs' entries for unprocessed platforms
  specfile_id = 'none';
  for (i = 0; i < unprocessedPlatforms.length; i++){
    capability_id = 'none_' + i;
    log('custom', 'platform', 'custom', unprocessedPlatforms[i], '');
    log('custom', 'process_logs', 'failed', 'Could not process JSON logs', '');  
  }

  // Return merged reports
  return joinedReports;
};

// Aggregate joinedReports into summaries and failed; see definitions below
aggregate = (joinedReports, customLogsToAdd, logUrlFunction) => {
  console.log('[ReportSummarizer.cjs] summarizing');
  // Per capability: capability_id, customLogsToAdd, number of passed, failed, skipped, failed_suites, and messages
  let summaries = [];
  // Per failed test: capability_id, specfile_id, customLogsToAdd, suite, message
  let failed = [];
  // List with each unique capability ID
  let capabilities;
  // Filtered logs
  let customLogs;
  // Extract unique capability IDs from joinedReports
  capabilities = joinedReports.map((row) => {
    return row.capability_id;
  });
  capabilities = Array.from(new Set(capabilities));
  // For each unique capability, aggregate data
  for(let capability of capabilities) {
    // *** Create summary
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
    // Add to summaries
    summaries.push(summary);

    // *** Create failed
    // All failed tests of this capability
    failedTests = joinedReports.filter(function (row) {
      return row.capability_id === capability && row.state === 'failed'
    });    
    failed = failed.concat(failedTests.map((failedTest) => {
      let failedRow = {};
      failedRow.capability_id = failedTest.capability_id;
      for (let customLog of customLogs) {
        failedRow[customLog.spec] = customLog.message;
      }
      let logUrl = logUrlFunction(
        joinedReports.filter(function (row) {
          return row.capability_id === capability && row.suite === failedTest.suite;
        })
      );
      failedRow.log_url = logUrl;
      failedRow.suite = failedTest.suite;
      failedRow.spec = failedTest.spec;
      failedRow.message = failedTest.message;
      return failedRow;
    }));
  }
  return {
    summaries: summaries,
    failed: failed
  };
};

// Perform log aggregation and store WDIO logs
aggregateAndStoreWdio = (joinedReports, logPath, onBrowserStack, buildPrefix, buildNamesToBuildIdsMap) => {
  // Construct logUrl function; returns nothing by default
  let logUrlFunction = () => {
    return '';
  };
  if (onBrowserStack) {
    logUrlFunction = (reports) => {
      // Get test name
      let testName = reports[0].suite;
      let buildName = buildPrefix + testName;
      let buildId = buildNamesToBuildIdsMap[buildName];
      // Find log entry with sessionId
      let sessionIdEntries = reports.filter((report) => {
        return report.state === 'custom' && report.spec === 'sessionId';
      });
      if (sessionIdEntries.length > 1) {
        // Found multiple entries; error
        throw new Error('[ReportSummarizer.cjs] During logUrlFunction, found ' + sessionIdEntries.length + ' sessionId entries');
      } else if (sessionIdEntries.length === 0) {
        // Found no entries; no logs on Browserstack
        return '';
      } else {
        // Found one entry, return URL to BrowserStack logs
        return '' +
          'https://automate.browserstack.com/dashboard/v2/builds/' +
          buildId +
          '/sessions/' +
          sessionIdEntries[0].message;
      }
    }
  }
  aggregateAndStore(joinedReports, logPath, logUrlFunction);
};

// Perform log aggregation and store karma logs
aggregateAndStoreKarma = (joinedReports, logPath, onBrowserStack) => {
  // Construct logUrl function; returns nothing by default
  let logUrlFunction = () => {
    return '';
  };
  if (onBrowserStack) {
    logUrlFunction = (reports) => {
      let logUrlreport = reports.filter((report) => {
        return report.state === 'custom' && report.spec === 'logUrl';
      });
      return logUrlreport[0].message;
    }
  }
  aggregateAndStore(joinedReports, logPath, logUrlFunction);
};

// Perform log aggregation and store logs; general function
aggregateAndStore = (joinedReports, logPath, logUrlFunction) => {
  // Store merged reports
  console.log('[ReportSummarizer.cjs] write "report" logs');
  writeJsonAndCsv(logPath + '/' + 'report', joinedReports);
  // Summarize reports
  let aggregations = aggregate(joinedReports, ['platform'], logUrlFunction);
  // Store summaries
  console.log('[ReportSummarizer.cjs] write "summary" logs');
  writeJsonAndCsv(logPath + '/' + 'summary', aggregations.summaries);
  console.log('[ReportSummarizer.cjs] write "failed" logs');
  writeJsonAndCsv(logPath + '/' + 'failed', aggregations.failed);
  // Store failed, summaries, and reports in a single XLSX
  console.log('[ReportSummarizer.cjs] write XLSX');
  writeXLSX(logPath + '/' + 'combined_report.xlsx', {
    failed: aggregations.failed,
    summary: aggregations.summaries,
    report: joinedReports
  });
};

module.exports = { 
  writeJsonAndCsv: writeJsonAndCsv,
  writeXLSX: writeXLSX,
  mergeWdio: mergeWdio,
  mergeKarma: mergeKarma,
  aggregate: aggregate,
  aggregateAndStoreWdio: aggregateAndStoreWdio,
  aggregateAndStoreKarma: aggregateAndStoreKarma
};