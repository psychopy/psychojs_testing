// Helper functions for FTP requests to report directory on Staging Server

// FTP module
let Client = require('ssh2-sftp-client');
// Path to staging report directory
let basePath = './var/www/staging/report';

// Makes a connection, performs request specified via requestFunction, then closes connection
ftpRequest = (requestFunction) => {
  console.log('Stager.js: establishing FTP connection');
  let client = new Client();
  client.connect({
    host: 'staging.psychopy.org',
    port: process.env.STAGING_PORT,
    username: process.env.STAGING_USERNAME,
    password: process.env.STAGING_PASSWORD
  }).then((data) => {
    console.log('Stager.js: performing request');
    return requestFunction(client);
  }).then((data) => {
    console.log('Stager.js: result is ' + data);
    return client.end();
  }).catch((err) => {
    console.log('Stager.js: error ' + err);
    return client.end();
  });
}

// Upload directory
uploadDirectory = (from, to) => {
  ftpRequest((client) => {
    console.log('Stager.js: uploading directory from ' + from + ' to ' + basePath + '/' + to);
    return client.uploadDir(from, basePath + '/' + to);
  });
}

// Delete directory recursively
deleteDirectory = (directory) => {
  ftpRequest((client) => {
    console.log('Stager.js: deleting directory at ' + basePath + '/' + directory);
    return client.rmdir(basePath + '/' + directory, true);
  });
}

module.exports = {
  uploadDirectory: uploadDirectory,
  deleteDirectory: deleteDirectory
};