const ReportSummarizer = require('./../shared/ReportSummarizer.cjs');
let joinedReports = ReportSummarizer.mergeKarma();
ReportSummarizer.writeJsonAndCsv('./.tmp_unit' + '/report', joinedReports);
let summaries = ReportSummarizer.summarize(joinedReports, ['platform']);
console.log(summaries);
ReportSummarizer.writeJsonAndCsv('./.tmp_unit' + '/summary', summaries);
// Store summaries of all tests with at least on fail
let summariesFailed = summaries.filter( (summary) => {
  return summary.failed > 0
})
ReportSummarizer.writeJsonAndCsv('./.tmp_unit' + '/' + 'failed', summariesFailed);
// Store failed, summaries, and reports in a single XLSX
console.log('[wdio.conf.cjs] write XLSX');
ReportSummarizer.writeXLSX('./.tmp_unit' + '/' + 'combined_report.xlsx', {
  failed: summariesFailed,
  summary: summaries,
  report: joinedReports
});