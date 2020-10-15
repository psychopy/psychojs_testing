let Client = require('ssh2-sftp-client');
let sftp = new Client();
let test = process.argv.pop();
let suite = process.argv.pop();
let cleanup = process.argv.pop();
let basePath = './var/www/staging/report';

//console.log("Updating reports to path: " + path);
sftp.connect({
  host: 'staging.psychopy.org',
  port: process.env.STAGING_PORT,
  username: process.env.STAGING_USERNAME,
  password: process.env.STAGING_PASSWORD
}).then((data) => {
  // Cleanup?
  if (cleanup === 'cleanup') {
    console.log('logs.ftp.js: cleanup ' + suite);
    return sftp.rmdir(basePath + '/' + suite, true);
  } else {
    console.log('logs.ftp.js: no cleanup');
    return Promise.resolve('no action');
  }
}).then((data) => {
  console.log('logs.ftp.js: ' + data);
  return sftp.uploadDir('./.tmp', basePath + '/' + suite + '/' + test);
}).then((data) => {
  console.log('logs.ftp.js: ' + data);
  return sftp.end();
}).catch((err) => {
  console.log('logs.ftp.js: ' + err);
});