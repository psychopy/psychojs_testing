// Sanitizes names for use in two situations:
// 1) As colon-separated elements of BrowsterStack build names
// 2) As directory names on the stager
// Any values that are not letters, numbers, periods (.), or underscores (_), are removed
module.exports = {
  validate: (option, value) => {
    const regExp = /^[a-zA-Z0-9\._]+$/;
    if (!regExp.test(value)) {
      throw new Error(
        '[NameSanitizer.cjs] The value ' + JSON.stringify(value) + ' for ' + option + 
        ' was invalid; may only contain '
      );
    }
    return true;
  },
  sanitize: (value) => {
    return value.replace(/[^a-zA-Z0-9\._]/g, '');
  }
};