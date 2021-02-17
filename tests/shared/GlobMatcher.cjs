// For pattern matching of strings with * and . wildcards
// From: https://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
const match = (wildcard, str) => {
  let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
  const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
  return re.test(str); // remove last 'i' above to have case sensitive
}

module.exports = {
  match: match
}