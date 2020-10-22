let Client = require('ssh2-sftp-client');
let sftp = new Client();

// Action is 'cleanup' or a test name
let action = process.argv.pop();
// Suite is 'big_test' or 'small_test'
let suite = process.argv.pop();
// Path to staging report directory
let basePath = './var/www/staging/report';

console.log('logs.ftp.js: connecting to staging.psychopy.org');
sftp.connect({
  host: 'staging.psychopy.org',
  port: process.env.STAGING_PORT,
  username: process.env.STAGING_USERNAME,
  password: process.env.STAGING_PASSWORD
}).then((data) => {
  // Cleanup?
  if (action === 'cleanup') {
    console.log('logs.ftp.js: cleaning up ' + suite);
    return sftp.rmdir(basePath + '/' + suite, true);
  } else {
    console.log('logs.ftp.js: uploading report to ' + suite + '/' + action);
    return sftp.uploadDir('./.tmp', basePath + '/' + suite + '/' + action);
  }
}).then((data) => {
  console.log('logs.ftp.js: ' + data);
  return sftp.end();
}).catch((err) => {
  console.log('logs.ftp.js: ' + err);
  return sftp.end();
});