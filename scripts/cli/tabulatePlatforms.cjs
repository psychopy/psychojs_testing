// Generates markdown tables for all available Platforms
// The table is stored in tests/cache/table_of_platforms.md

// Modules
const CLIParser = require('../shared/CLIParser.cjs');
const CapabilityGenerator = require('../shared/capabilities.bs.cjs');
const json2md = require('json2md');
const Paths = require('../shared/Paths.cjs');
const fs = require('fs-extra');

// Convert platforms from JSON format to table
platformsToTable = function (platforms) {
  let formattedPlatforms = platforms.map((platform) => {
    let formattedPlatform = {};
    formattedPlatform.Platform = '`' + platform.displayName + '`';
    formattedPlatform.Device = platform.device === null? '': platform.device;
    formattedPlatform.OS = platform.os;
    formattedPlatform.Version = platform.os_version;
    formattedPlatform.Browser = platform.browser === 'iphone' || platform.browser === 'android'? '':  platform.browser;
    return (formattedPlatform);
  });
  let table = {
    headers: ['Platform', 'Device', 'OS', 'Version', 'Browser'],
    aligns: ['left', 'left', 'left', 'left', 'left'],
    rows: formattedPlatforms
  };
  return (table);
}

let subsetPlatforms = platformsToTable(CapabilityGenerator.getJsonCapabilities('*', true))
let allPlatforms = platformsToTable(CapabilityGenerator.getJsonCapabilities('*', false))

let markdown = json2md([
  {h1: 'Platforms belonging to subset'},
  {table: subsetPlatforms},
  {h1: 'All Platforms'},
  {table: allPlatforms}
]);
console.log(markdown);
fs.outputFileSync(Paths.dir_cache + '/table_of_platforms.md', markdown);

