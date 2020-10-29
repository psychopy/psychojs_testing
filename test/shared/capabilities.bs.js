module.exports = { 
  capabilities: (build, platformPattern, test, subset) => {
    // For pattern matching of strings with * and . wildcards
    // From: https://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
    function wildTest(wildcard, str) {
      let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
      const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
      return re.test(str); // remove last 'i' above to have case sensitive
    }

    // Settings shared by desktop and mobile
    let projectName = 'PsychoJS',
        video = 'true',
        debug = 'true';
    // All generated capabilities
    let output = [];

    let generalSettings, specificSettings, platform, capability;
    
    // *** Desktop
    generalSettings = {
      'bstack:options': {
        buildName: build,
        projectName: projectName,
        video: video,
        debug: debug,
        seleniumVersion: '3.141.59',
        resolution: '1280x1024',
        local: 'false'
      },
      browserVersion: 'latest'
    };
    
    // os, osVersion, browser
    specificSettings = [
      {
        'os': 'Windows',
        'osVersion': '10',
        'browserNames': [
          ['Chrome', true],
          ['Edge', false], 
          ['Firefox', true],
          ['IE']
        ]
      },
      {
        'os': 'Windows',
        'osVersion': '8.1',
        'browserNames': ['Chrome', 'Edge', 'Firefox', 'IE']
      },
      {
        'os': 'Windows',
        'osVersion': '7',
        'browserNames': ['Chrome', 'Edge', 'Firefox', 'IE']
      },
      {
        'os': 'OS X',
        'osVersion': 'Catalina',
        'browserNames': ['Chrome', 'Edge', 'Firefox', 'Safari']
      },
      {
        'os': 'OS X',
        'osVersion': 'Mojave',
        'browserNames': ['Chrome', 'Edge', 'Firefox', 'Safari']
      },
      {
        'os': 'OS X',
        'osVersion': 'High Sierra',
        'browserNames': [
          ['Chrome', true],
          ['Edge', true], 
          ['Firefox', true],
          ['Safari', true]
        ]
      }
      
      
      
//      {
//        'os': 'OS X',
//        'osVersion': 'Sierra',
//        'browserNames': ['Chrome', 'Edge', 'Firefox', 'Safari']
//      },
//      {
//        'os': 'OS X',
//        'osVersion': 'El Capitan',
//        'browserNames': ['Chrome', 'Firefox', 'Safari']
//      },
//      {
//        'os': 'OS X',
//        'osVersion': 'Yosemite',
//        'browserNames': ['Chrome', 'Firefox', 'Safari']
//      },
//      {
//        'os': 'OS X',
//        'osVersion': 'Mavericks',
//        'browserNames': ['Chrome', 'Firefox', 'Safari']
//      },
      /*{
        'os': 'OS X',
        'osVersion': 'Mountain Lion',
        'browserNames': ['Chrome', 'Firefox', 'Safari']
      },
      {
        'os': 'OS X',
        'osVersion': 'Lion',
        'browserNames': ['Chrome', 'Firefox', 'Safari']
      }*/
    ];
    
    // Construct desktop capabilities
    let browserName, belongsToSubset;
    for (let specificSetting of specificSettings) {
      //specificSetting = specificSettings[specificSetting_i];
      for (let browser of specificSetting.browserNames) {
        if (typeof browser === "string") {
          browserName = browser;
          belongsToSubset = false;
        } else {
          browserName = browser[0];
          belongsToSubset = browser[1];
        }        
        platform =           
          specificSetting.os + '_' +
          specificSetting.osVersion + '_' +
          browserName + '_' +
          generalSettings.browserVersion;
        //platform = platform.replace(/ /gi, "#");          
        capability = JSON.parse(JSON.stringify(generalSettings));
        capability['bstack:options'].sessionName = test + ':' + platform;
        capability['bstack:options'].os = specificSetting.os;
        capability['bstack:options'].osVersion = specificSetting.osVersion;
        capability.browserName = browserName;
        capability['e2e_robot:platform'] = platform;
        if (wildTest(platformPattern, platform) && (!subset || belongsToSubset)) {
          output.push(capability);
        }
      }
    }    
    
    // *** Mobile
    generalSettings = {
      'bstack:options': {
        buildName: build,
        projectName: projectName,
        video: video,
        debug: debug,
//        realMobile: 'true',
//        local: 'false',
        appiumVersion: '1.17.0',
        appiumLogs: 'false'
      }
    };    
    
    // os, osVersion, device
    specificSettings = [
      {
        'os': 'Android',
        'browserName': 'Android',
        'devices': [
          ['11.0', 'Google Pixel 4', true],
          
          ['10.0', 'Samsung Galaxy S20'],
          ['10.0', 'Samsung Galaxy S20 Plus'],
          ['10.0', 'Samsung Galaxy S20 Ultra'],
          ['10.0', 'Google Pixel 4 XL'],
          ['10.0', 'Google Pixel 4'],
          ['10.0', 'Google Pixel 3', true],
          ['10.0', 'OnePlus 8'],
          ['10.0', 'OnePlus 7T'],
          
          ['9.0', 'Samsung Galaxy S9 Plus', true],
          ['9.0', 'Samsung Galaxy S8 Plus'],
          ['9.0', 'Samsung Galaxy S10e'],
          ['9.0', 'Samsung Galaxy S10 Plus'],
          ['9.0', 'Samsung Galaxy S10'],
          ['9.0', 'Samsung Galaxy Note 10 Plus'],
          ['9.0', 'Samsung Galaxy Note 10'],
          ['9.0', 'Samsung Galaxy A10'],
          ['9.0', 'Google Pixel 3a XL'],
          ['9.0', 'Google Pixel 3a'],
          ['9.0', 'Google Pixel 3 XL'],
          ['9.0', 'Google Pixel 3'],
          ['9.0', 'Google Pixel 2'],
          ['9.0', 'Motorola Moto G7 Play'],          
          ['9.0', 'OnePlus 7'],
          ['9.0', 'OnePlus 6T'],
          ['9.0', 'Xiaomi Redmi Note 8'],
          ['9.0', 'Xiaomi Redmi Note 7'],
          ['9.0', 'Samsung Galaxy Tab S6'],
          ['9.0', 'Samsung Galaxy Tab S5e'],

          ['8.1', 'Samsung Galaxy Note 9'],
          ['8.1', 'Samsung Galaxy J7 Prime'],
          ['8.1', 'Samsung Galaxy Tab S4'],          
          
          ['8.0', 'Samsung Galaxy S9 Plus'],
          ['8.0', 'Samsung Galaxy S9'],
          ['8.0', 'Google Pixel 2'],
          ['8.0', 'Google Pixel'],
          // ['8.0', 'Samsung Galaxy Tab S3'], // Not supported anymore
          
          ['7.1', 'Samsung Galaxy Note 8'],
          ['7.1', 'Samsung Galaxy A8'],
          ['7.1', 'Google Pixel'],
          
          ['7.0', 'Samsung Galaxy S8 Plus'],
          ['7.0', 'Samsung Galaxy S8', true],
          ['7.0', 'Samsung Galaxy Tab S3'],
          
          ['6.0', 'Samsung Galaxy S7'],
          ['6.0', 'Samsung Galaxy Note 4'],
          ['6.0', 'Google Nexus 6'],
          ['6.0', 'Motorola Moto X 2nd Gen']


          
//          ['5.0', 'Samsung Galaxy S6'],
//          ['5.0', 'Google Nexus 6'],
//          ['5.0', 'Motorola Moto X 2nd Gen'],

//          ['4.4', 'Samsung Galaxy Note 4'],
//          ['4.4', 'Google Nexus 5'],
//          ['4.4', 'Samsung Galaxy Tab 4']
        ]
      },
      {
        'os': 'iOS',
        'browserName': 'iPhone',
        'devices': [
          ['13', 'iPhone XS'],
          ['13', 'iPhone 11 Pro Max'],
          ['13', 'iPhone 11 Pro'],
          ['13', 'iPhone 11'],
          ['13', 'iPhone SE 2020'],
          ['13', 'iPhone 8', true],          
          ['13', 'iPad Pro 12.9 2020'],
          ['13', 'iPad Pro 12.9 2018'],
          ['13', 'iPad Pro 11 2020'],
          ['13', 'iPad 7th'],

          // ['12', 'iPhone XS'],
          // ['12', 'iPhone XS Max'],
          ['12', 'iPhone XR', true],
          // ['12', 'iPhone 8'],
          // ['12', 'iPhone 8 Plus'],
          // ['12', 'iPhone 7'],          
          // ['12', 'iPhone 6S'],          
          // ['12', 'iPad Pro 12.9 2018'],
          // ['12', 'iPad Pro 11 2018'],
          // ['12', 'iPad Mini 2019'],
          // ['12', 'iPad Air 2019']
          
//          ['11', 'iPhone X'],
//          ['11', 'iPhone 8'],
//          ['11', 'iPhone 8 Plus'],
//          ['11', 'iPhone 6S'],
//          ['11', 'iPhone 6S Plus'],
//          ['11', 'iPhone 6'],
//          ['11', 'iPhone SE'],
//          ['11', 'iPad Pro 9.7 2016'],
//          ['11', 'iPad Pro 12.9 2017'],
//          ['11', 'iPad Mini 4'],
          ['11', 'iPad 6th'],
//          ['11', 'iPad 5th'],
//
//          ['10', 'iPhone 7'],
//          ['10', 'iPhone 7 Plus']
        ]
      }      
    ];
    for (let specificSetting of specificSettings) {
      for (let device of specificSetting.devices) {
        belongsToSubset = device.length > 2 && device[2];
        //console.log(device);
        platform = 
          specificSetting.os + '_' +
          device[0] + '_' +
          device[1] + '_' +
          specificSetting.browserName;
        //platform = platform.replace(/ /gi, "#");
        capability = JSON.parse(JSON.stringify(generalSettings));
        capability['bstack:options'].sessionName = test + ':' + platform;
        capability['bstack:options'].os = specificSetting.os;
        capability['bstack:options'].osVersion = device[0];
        capability['bstack:options'].deviceName = device[1];
        //capability['bstack:options'].platformName = specificSetting.os;
        capability.browserName = specificSetting.browserName;
        //capability.platformName = specificSetting.os;
        capability['e2e_robot:platform'] = platform;
        
        if (wildTest(platformPattern, platform) && (!subset || belongsToSubset)) {
          output.push(capability);
        }        
      }
    }    
    return (output);
  }
};