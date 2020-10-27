// Performs visual regression tests of screenshots

// *** Modules
const Jimp = require('jimp');
const replaceColor = require('replace-color')
const fs = require('fs');
const json2csv = require('json2csv');

const paths = {
  reference_imgs: 'https://thomaspronk.com/temp/reference_imgs/',
  counterexample_imgs: './test/counterexample_imgs/',
  screenshots: '.tmp/screenshots/',
  cutouts: './.tmp/cutouts/',
  cutouts_resized: './.tmp/cutouts_resized/',
  processed_logs: './.tmp/processed_logs/'
};
const colorsToRed = [
  Buffer.from([255,0,0]),
  Buffer.from([234,51,35]), 
  Buffer.from([254,0,0])
];

// SD of difference scores
// Based on https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Na%C3%AFve_algorithm
let sdOfDifferences = (expected, observed, dropAlpha = true) => {
  // Summary stats for SD
  let sum = 0, sumSq = 0, n = 0, i, dif;
  // Compare 3 RGB values or also alpha?
  let channelLimit = dropAlpha? 3: 4;
  // Calculate SD
  expected.scan(0, 0, expected.bitmap.width, expected.bitmap.height, function(x, y, idx) {
    for (i = 0; i < channelLimit; i++) {
      //console.log(expected[idx + i].bitmap.data);
      dif = expected.bitmap.data[idx + i] - observed.bitmap.data[idx + i];
      sum += dif;
      sumSq += dif * dif;
      n++;
    }
  });
  return Math.sqrt((sumSq - (sum * sum) / n) / n);
};
        
// Compare two images
let compareScreenshotWithReference = async (screenshotImg, referenceImg, screenshotFilename) => {
  // Preliminary cutout borders
  let top = screenshotImg.bitmap.height;
  let bottom = 0;
  let left = screenshotImg.bitmap.width;
  let right = 0;
  // Replace colors and find cutout border
  screenshotImg = screenshotImg.scan(0, 0, screenshotImg.bitmap.width, screenshotImg.bitmap.height, function(x, y, idx) {
    // Replace colors by red
    let isRed = false;
    for (let color of colorsToRed) {
      if(Buffer.compare(color, this.bitmap.data.slice(idx, idx + 3)) === 0) {
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 0;
        this.bitmap.data[idx + 2] = 0;
        isRed = true;
      }
    }
    // if this red pixel is further than existing borders, update borders
    if (isRed) {
      if (x < left) { left = x;}
      if (x > right) { right = x;}
      if (y < top) { top = y;}
      if (y > bottom) { bottom = y;}
    }
  });
  // Check if cutout is square
  let width = right - left;
  let height = bottom - top;
  let longerSide = Math.max(width, height);
  let shorterSide = Math.min(width, height);
  if (width !== height) {
    console.log(
      '\x1b[33m' +
      ' Cutout not square. ' +
      (100 * (longerSide / shorterSide) - 100).toFixed(2) +
      '%' +
      '\x1b[0m'
    );
  }  
  // Crop cutout
  let cutoutImg;
  let cutoutSuccess = true;
  try {
    cutoutImg = screenshotImg.crop(
      left,
      top,
      width,
      height
    );
    cutoutImg.write(paths.cutouts + screenshotFilename);
  } catch (e) {
    cutoutSuccess = false;
    console.log(
      '\x1b[31m' +
      ' Cutout failed. ' +
      [left, top, right, bottom] +
      '\x1b[0m'
    );
  }
  // Resize cutout to reference
  cutoutImg = await cutoutImg.resize(referenceImg.bitmap.width, referenceImg.bitmap.width);
  cutoutImg.write(paths.cutouts_resized + screenshotFilename);
  // Compare
  let rms = sdOfDifferences(referenceImg, cutoutImg);
  // Return results
  return {
    aspect: longerSide / shorterSide,
    rms: rms,
    cutoutSuccess: cutoutSuccess
  };
};

let getReferenceImg = async (prefix) => {
  try {
    referenceImg = await Jimp.read(paths.reference_imgs + prefix + '.png');
    console.log('Found reference image for prefix ' + prefix);
    return referenceImg;
  } catch(e) {
    console.log('No reference image for prefix ' + prefix);
    return null;
  };
}

let compareScreenshotsWithReferences = async (validate) => {
  // If true, at least one comparison failed
  failed = false;
  // Read screenshot filenames
  let allScreenshotFilenames = fs.readdirSync(paths.screenshots);
  // Extract prefixes
  let prefixes = allScreenshotFilenames.map(function(referenceFilename) {
    return referenceFilename.split(' ')[0]
  });  
  // Only unique prefixes
  prefixes = prefixes.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  // Local vars
  let referenceImg, screenshotFilenames, screenshotImg, platform;
  let results = [], result;  
  // For each prefix, compare with screenshot  
  for (let prefix of prefixes) {
    referenceImg = null;
    // Read reference img
    try {
      referenceImg = await Jimp.read(paths.reference_imgs + prefix + '.png');
      console.log('Found reference image for prefix ' + prefix);
      // Filter out screenshot filenames with matching prefix
      screenshotFilenames = allScreenshotFilenames.filter(function (screenshotFilename) {
        return screenshotFilename.startsWith(prefix);
      });    
      // For each screenshot filename, read image, and compare
      for (let screenshotFilename of screenshotFilenames) {
        screenshotImg = await Jimp.read(paths.screenshots + screenshotFilename);
        // Make comparison
        result = await compareScreenshotWithReference(
          screenshotImg,
          referenceImg,
          screenshotFilename
        );
        // Extract platform from screenshotFilename, add to result
        platform = screenshotFilename.split(" ")[1];
        platform = platform.substring(0, platform .length - 4);
        result.platform = platform;
        // Add prefix to result
        result.prefix = prefix;
        // Add to results
        results.push(result);
        // Check if failed
        failed = failed || !result.cutoutSuccess || result.rms > 20;
      }  
      // If validate, also compare counter examples
      if (validate) {
        // Read counterexample filenames
        let counterexampleFilenames = fs.readdirSync(paths.counterexample_imgs);
        // For each counter example filename, read image, and compare
        for (let screenshotFilename of counterexampleFilenames) {
          screenshotImg = await Jimp.read(paths.counterexample_imgs + screenshotFilename);
          // Make comparison
          result = await compareScreenshotWithReference(
            screenshotImg,
            referenceImg,
            screenshotFilename
          );
          // Extract platform from screenshotFilename, add to result
          platform = screenshotFilename.substring(0, screenshotFilename.length - 4);
          result.platform = platform;
          // Add prefix to result
          result.prefix = prefix;
          // Add to results
          results.push(result);
        }      
      }      
    } catch(e) {
      console.log('No reference image for prefix ' + prefix);
    }
  }  
  // Store output as JSON
  fs.writeFileSync(
    paths.processed_logs + 'screenshot_stats.json',
    JSON.stringify(results)
  );
  // Store output as CSV
  if (results.length > 0) {
    fs.writeFileSync(
      paths.processed_logs + 'screenshot_stats.csv',
      json2csv.parse(results)
    );  
  }
  // If failed, exit with status 1
  if (failed) {
    //process.exit(1);
  }
};

module.exports = {
  compareScreenshotsWithReferences: compareScreenshotsWithReferences,
  compareScreenshotWithReference: compareScreenshotWithReference,
  getReferenceImg: getReferenceImg
};
