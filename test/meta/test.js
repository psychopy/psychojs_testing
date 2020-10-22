const Jimp = require('jimp');

let test = async () => {
  try {
    screenshotImg = await Jimp.read('https://example.com/noimghere');
  } catch(e) {
    console.log('caught exception');
    console.log(e);
  }
}
test();

console.log("TRAVIS_BRANCH");
console.log(process.env.TRAVIS_BRANCH);
console.log("TRAVIS_COMMIT_MESSAGE");
console.log(process.env.TRAVIS_COMMIT_MESSAGE);