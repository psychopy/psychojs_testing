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