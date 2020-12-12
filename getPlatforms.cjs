const BrowserStack = require('./shared/BrowserStack.cjs');

let sessions = BrowserStack.getSessionsByBuildName('PsychoJS_unit', 'thomas:all_tests:all_tests');
const fs = require('fs');
fs.writeFileSync(
  'sessions.json',
  JSON.stringify(output)
);
console.log(sessions);