Scripts for automated end-to-end testing of [PsychoJS](https://github.com/psychopy/psychojs) tasks administered via [Pavlovia](https://pavlovia.org/). 
<div id='table-of-contents'></div>

[![Build Status](https://travis-ci.com/tpronk/e2e_robot.svg?token=6izyiVgqEnSkDy65zqqq&branch=master)](https://travis-ci.com/tpronk/e2e_robot)

# Table of contents
* [Core technologies](#core-technologies)
* [Installation](#installation)
    * [Setting up a local Selenium server](#setting-up-a-local-selenium-server)
    * [Setting up BrowserStack](#setting-up-browserstack)
* [Running tests](#running-tests)
    * [Test configuration](#test-configuration)
    * [Examples](#examples)
    * [Supporting scripts](#supporting-scripts)
* [Testing issues and workarounds](#testing-issues-and-workarounds)
    * [Which OSs and browsers to support?](#which-oss-and-browsers-to-support)
    * [Interacting with an HTML canvas](#interacting-with-an-html-canvas)
    * [Screenshots](#screenshots)
        * [Making screenshots](#making-screenshots)
        * [Processing screenshots](#processing-screenshots)
    * [Registering platform](#registering-platform)
    * [Registering screen resolution](#registering-screen-resolution)
    * [Handling network time-outs](#handling-network-time-outs)
    * [Speeding up testruns](#speeding-up-testruns)
* [Generating and parsing test logs](#generating-and-parsing-test-logs)
    * [Generating custom logs](#generating-custom-logs)
    * [Parsing custom logs](#parsing-custom-logs)
* [Overview of tests](#overview-of-tests)

<div id='core-technologies'></div>

# Core technologies
- [WebdriverIO](https://webdriver.io/) is used as automation framework and [Jasmine](https://jasmine.github.io/index.html) as testing framework.
- It can be deployed locally via the [Selenium Standalone Service](https://webdriver.io/docs/selenium-standalone-service.html) and on a cloud-based testing service via the [BrowserStack service](https://webdriver.io/docs/browserstack-service.html)
- The tests are set up to run on both desktop/laptop devices via [Selenium WebDriver](https://www.selenium.dev/documentation/en/webdriver/) and mobile devices via [Appium](https://appium.io/)

<div id='installation'></div>

# Installation
To install all dependencies, run `npm install`

<div id='setting-up-a-local-selenium-server'></div>

## Setting up a local Selenium server
The installation provides a Selenium Standalone service that includes Chrome and Firefox. Note that Safari is not supported by the Selenium Standalone Service. For Safari, see explanation on how to enable its webdriver [here](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari#overview). Edge was also tricky to get to work. Workaround (as described [here](https://eyeontesting.com/answers/microsoft-edge-browser-and-uft-1254/#gsc.tab=0): download the Edge driver, rename it to MicrosoftWebDriver.exe, then start the server via: `webdriver-manager start`. However, this workaround caused issues with Edge reporting errors after rebooting my computer, so I recommend not to apply it, but use BrowserStack instead.

<div id='setting-up-browserstack'></div>

## Setting up BrowserStack
1. Set up a [BrowserStack](https://www.browserstack.com/) account
2. Store your Browserstack username in a system environment variable named BROWSERSTACK_USER 
3. Store your Browserstack access key in a system environment variable named BROWSERSTACK_ACCESSKEY

<div id='running-tests'></div>

# Running tests 
An end-to-end testrun can be started via this command:
`npx wdio wdio.conf.js`

<div id='test-configuration'></div>

## Test configuration
In addition to the standard [WebDriverIO CLI Options](https://webdriver.io/docs/clioptions.html), the following options are available.

Name | Required? | Description | How to specify | Values
:--- | :--- | :--- | :--- | :---
server | Yes | Selenium/Appium server that controls the web-browser | Via CLI option `--server` | `bs` for BrowserStack, `local` for local server
upload | No; disabled by default | Upload reports to PsychoPy's staging server | Via CLI option `--upload` | `yes` to upload, `no` to not upload
branch | If `server == bs` or `upload == yes` | On BrowserStack, the test logs will get this name as their build. On the staging server, the test logs will be uploaded to this directory. | Via `TRAVIS_BRANCH` environment variable or CLI option `--branch` | Any string that is a valid directory. Note that BrowserStack will filter out [characters that it does not accept](https://www.browserstack.com/question/640) in build names.
subset | No; whole set of platforms by default | Set of pre-specified platforms for shortened testrun. See [Registering platform](#registering-platform) | Via CLI options `--subset` | `yes` for subset of platforms, `no` for whole set
platform | No; all platforms (included in whole set or subset) by default (`*`) | Platforms to run tests on. See [Registering platform](#registering-platform) | Via CLI option `--platform` | Any string with `*` and `.` wildcards
test | No; all tests by default | Which test to run. See [Overview of tests](#overview-of-tests) | Via CLI option `--test` | Any valid test name

<div id='examples'></div>

## Examples
Run all tests via local server.

`npx wdio wdio.conf.js --server local`

Run the e2e_img test on each Android device via BrowserStack, using demo as name for the logs, and uploading reports to the PsychoPy staging server. 

`npx wdio wdio.conf.js --server local --upload yes --branch demo --platform *Android* --test e2e_img`

<div id='supporting-scripts'></div>

## Supporting scripts
A set of supporting modules are available in `test/shared`, with CLI interfaces in `test/cli`.

<div id='testing-issues-and-workarounds'></div>

# Testing issues and workarounds

<div id='which-oss-and-browsers-to-support'></div>

## Which OSs and browsers to support?
PsychoJS experiments are aimed to be compatible with the platforms below, which were selected for having a large market share in June 2020 and being supported by BrowserStack Automate. See market share of [desktop/laptop OSs](https://www.netmarketshare.com/operating-system-market-share.aspx?options=%7B%22filter%22%3A%7B%22%24and%22%3A%5B%7B%22deviceType%22%3A%7B%22%24in%22%3A%5B%22Desktop%2Flaptop%22%5D%7D%7D%5D%7D%2C%22dateLabel%22%3A%22Custom%22%2C%22attributes%22%3A%22share%22%2C%22group%22%3A%22platformVersion%22%2C%22sort%22%3A%7B%22share%22%3A-1%7D%2C%22id%22%3A%22platformsDesktopVersions%22%2C%22dateInterval%22%3A%22Monthly%22%2C%22dateStart%22%3A%222020-06%22%2C%22dateEnd%22%3A%222020-06%22%2C%22plotKeys%22%3A%5B%7B%22platformVersion%22%3A%22Android%209.0%22%7D%2C%7B%22platformVersion%22%3A%22Android%208.1%22%7D%2C%7B%22platformVersion%22%3A%22iOS%2013.3%22%7D%2C%7B%22platformVersion%22%3A%22Android%2010.0%22%7D%5D%2C%22segments%22%3A%22-1000%22%7D), [mobile OSs](https://www.netmarketshare.com/operating-system-market-share.aspx?options=%7B%22filter%22%3A%7B%22%24and%22%3A%5B%7B%22deviceType%22%3A%7B%22%24in%22%3A%5B%22Mobile%22%5D%7D%7D%5D%7D%2C%22dateLabel%22%3A%22Custom%22%2C%22attributes%22%3A%22share%22%2C%22group%22%3A%22platformVersion%22%2C%22sort%22%3A%7B%22share%22%3A-1%7D%2C%22id%22%3A%22platformsDesktopVersions%22%2C%22dateInterval%22%3A%22Monthly%22%2C%22dateStart%22%3A%222020-06%22%2C%22dateEnd%22%3A%222020-06%22%2C%22plotKeys%22%3A%5B%7B%22platformVersion%22%3A%22Android%209.0%22%7D%2C%7B%22platformVersion%22%3A%22Android%208.1%22%7D%2C%7B%22platformVersion%22%3A%22iOS%2013.3%22%7D%2C%7B%22platformVersion%22%3A%22Android%2010.0%22%7D%5D%2C%22segments%22%3A%22-1000%22%7D), and [desktop/laptop browsers](https://www.netmarketshare.com/browser-market-share.aspx?options=%7B%22filter%22%3A%7B%22%24and%22%3A%5B%7B%22deviceType%22%3A%7B%22%24in%22%3A%5B%22Desktop%2Flaptop%22%5D%7D%7D%5D%7D%2C%22dateLabel%22%3A%22Trend%22%2C%22attributes%22%3A%22share%22%2C%22group%22%3A%22browser%22%2C%22sort%22%3A%7B%22share%22%3A-1%7D%2C%22id%22%3A%22browsersDesktop%22%2C%22dateInterval%22%3A%22Monthly%22%2C%22dateStart%22%3A%222019-07%22%2C%22dateEnd%22%3A%222020-06%22%2C%22segments%22%3A%22-1000%22%7D)
- Windows 7, 8.1, and 10 + Chrome, Edge, and Firefox (IE support forthcoming)
- MacOS 10.13, 10.14, and 10.15 +  Chrome, Edge, and Firefox (Safari support forthcoming)
- iOS 13
- Android 6+

Note that presently, Appium only supports running tests in the native web-browser of a mobile operating system.

<div id='interacting-with-an-html-canvas'></div>

## Interacting with an HTML canvas
PsychoJS presents stimuli and records responses via a `canvas` HTML element, so the options to use DOM selectors for interactions are relatively limited. Instead, one can use Actions. Both [Selenium](https://w3c.github.io/webdriver/#actions) and [Appium](https://appium.io/docs/en/commands/interactions/actions/) have a similar API for implementing Actions. However, there are some nuances in how they are supported on the different OSs:
- For Windows, Mac OS, and Android, I found that using the `canvas` element as `origin` for a `pointerMove` Action was more robust than using the `viewport` as `origin`.
- For iOS, I found that using the `canvas` element as `origin` for a `pointerMove` Action was not supported, but using the `viewport` as `origin` worked robustly.

Useful links:
- [Webdriver specs](https://github.com/jlipps/simple-wd-spec#perform-actions) for examples of how to use them in WebdriverIO) for browser.performActions, which also includes some examples.
- [Codes for special keyboard keys](https://www.selenium.dev/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html)

<div id='screenshots'></div>

## Screenshots

<div id='making-screenshots'></div>

### Making Screenshots
There are multiple ways of making screenshots of a canvas, but none is ideal:
- One approach is by enabling debug mode as a [Browserstack capability](https://www.browserstack.com/automate/capabilities). In this case, screenshots are made on an OS level, recording the whole screen of the device, including all user interface elements. These screenshots can then be obtained via BrowserStack's REST API. However, I found that this did not work consistently; occassionally, screenshots were not available.
- Another approach is converting the [canvas to a data URI](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL). However, this did not work consistently; some browsers delivered a screenshot, but some did not.
- The most consistent method I have found so far is via an [in-browser screenshot](https://webdriver.io/docs/api/webdriver.html#takescreenshot). This consistently delivered screenshots on all platforms except for Safari on MacOS X. Moreover, there were some differences in what these screenshots contained. Windows, MacOS, and Android, delivered a screenshot of the browser viewport, but iOS delivered a screenshot of the whole screen, including GUI elements. I have not examined whether this is related to web pages being displayed full-screen or not.

<div id='processing-screenshots'></div>

### Processing screenshots
The custom browser command `browser.writeScreenshot(name)` stores an in-browser screenshot as PNG file into `.tmp/screenshots/`. The filename of this PNG is `<name> <platformName>.PNG`. The module `test/shared/VisualRegressor.js` conducts a series of image processing steps on each screenshot in order to make them more comparable:
1. For extracting the actual graphics on the PsychoJS canvas, and so excluding any of the grey background or browser user interface elements, they should be surrounded by a red (255, 0, 0) rectangle. This rectangle is cut out and stored in `.tmp/cutouts/`.
2. Next, each cutout is resized to have the same dimensions as its reference image. The resized cutout is stored in `.tmp/cutouts_resized/`.
3. Finally, the resized cutout is compared with the reference image, by calculating the RMS of the difference in RGB values of each pixel. There are separate repos illustrating a [JavaScript](https://github.com/tpronk/img_compare_js) and [Python](https://github.com/tpronk/img_compare_py) implementation of the RMS difference measure.

For each filename of the form `<name>.jpg` that can be downloaded from [https://staging.psychopy.org/reference_imgs](https://staging.psychopy.org/reference_imgs), screenshots that are prefixed `<name>` are compared via the procedure above. Additionally, RMS values cab calculated for set of counterexamples, which should be present in `test/counterexample_imgs/`.

<div id='registering-platform'></div>

## Registering platform
Device capabilities can be obtained during a test run by accessing `browser.capabilities`. However, this doesn't consistently return all the capabilities that we would like to log. Hence, we added a `e2e_robot:platform` capability, which can be obtained by calling the custom browser command `browser.getPlatformName()`. The `e2e_robot:` vendor prefix prevents WebDriver and Appium halting local tests due to an unsupported capability.

The format of platform differs between desktop/laptop and mobile OSs:
   - **Desktop/laptop.** `<os>_<osVersion>_<browserName>_<browserVersion>`. For example: `Windows_10_Chrome_latest`
   - **Mobile.** `<os>_<osVersion>_<device>_<browserName>`. For example: `iOS_13_iPhone SE 2020_iPhone`

In addition, sessions in BrowserStack and filenames of screenshots are postfixed by platform names, as follows:
   - **BrowserStack session** `<test>:<platform>`. For example: `e2e_img:Windows_10_Chrome_latest`
   - **Screenhost filename** `<screenshot>#<platform>`. For example: `img1#iOS_13_iPhone SE 2020_iPhone`

<div id='registering-screen-resolution'></div>

## Registering screen resolution
- **Windows and MacOS.** Screen resolution can be specified via the BrowserStack capability `bstack:options.resolution`.
- **Android.** Screen resolution can be obtained during a test run via `browser.capabilities.deviceScreenSize`.
- **iOS** Screen resolution cannot be specified nor obtained, so I added a function `wdUril.getResolutionFromDevice(device)` that returns the screen resolution of a given iOS 13 device.

<div id='handling-network-time-outs'></div>

## Handling network time-outs
BrowserStack's open source subscription allows for 5 instances to run simultaneously, as can be specified in `wdio.conf.js` via `maxInstances`. However, due to network hickups, requests from the testing script may arrive at the BroswerStack server; acknowledgment of the request not being received by the testing script; being resent; and thus exceeding BrowserStack's limit of 5 instances. I found that setting `maxInstances` to 3 is a relatively safe number for preventing this issue.

<div id='speeding-up-testruns'></div>

## Speeding up testruns
There are two factors that can cause PsychoJS test-runs to be relatively slow: Firstly, tests that require precise pointer interactions need to be preceded by a calibration procedure. Secondly, for each spec file, WebdriverIO starts up a separate session. Starting up a new session can take a while, especially on mobile devices. To speed up test-runs, tests are bundled into a single spec file called `test/specs/all_tests.js`. This spec file first executes the calibration procedure, then executes each test, by calling each function specified in `SharedBehaviors.tests` with the calibration results as its first argument. This is the default behavior of `e2e_robot`.

<div id='generating-and-parsing-test-logs'></div>

# Generating and parsing test logs
<div id='generating-custom-logs'></div>

## Generating custom logs
By default, jasmine's test reporters only report whether a test was passed, had failed, or was skipped. Additional information is only logged upon a fail. I added a feature for logging additional information. The custom browser commands `browser.logInit`, `bowser.logAdd`, and `browser.logGet` can be used to manage this log. Customized logs are stored in `browser.capabilities.customLogs`, which are in turn stored in JSON files in `.tmp/json_logs/` via the [JSON reporter](https://webdriver.io/docs/wdio-json-reporter.html). 
<div id='parsing-custom-logs'></div>

## Parsing custom logs
The module `test/shared/ReportSummarizer.js` combines and aggretates the logs into JSON and CSV files that are stored in `.tmp/processed_logs/`. In some cases an empty JSON logfile, or no logfile at all, is produced. This can happen, for example, when a BrowserStack session could not be initialized. In these cases, a special set of entries are added to the processed logs, usingy the capability_ids `none_1`, `none_2` etc. One entry registers the platform, while a second entry has spec `parse_logs` and state `failed`.

<div id='overview-of-tests'></div>

# Overview of tests
The individual tests are summarized in the table below. For each test, it lists:
* **Name.** The name of the test function in  `SharedBehaviors.tests`, which is also the name of the corresponding experiment on Pavlovia
* **Description.** A brief description
* **GitLab.** A link to its [Pavlovia GitLab](https://gitlab.pavlovia.org) repo
* **Demo.** A link to an online demo on [Pavlovia](pavlovia.org)
* **PsychoPy.** Whether it also works on PsychoPy

Name | Description | GitLab | Demo | PsychoPy 
:--- | :--- | :---: | :---: | :---:
e2e_calibration | Registers a series of clicks and outputs their coordinates via html.data-report. This experiment used to calibrate PointerMove Actions via WebDriver and Appium. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_calibration) | [Demo](https://run.pavlovia.org/tpronk/e2e_calibration) | No
e2e_conditions | Reads in a CSV and XLSX conditions file and loops over them using various randomisation settings. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_conditions) | [Demo](https://run.pavlovia.org/tpronk/e2e_conditions/html) | Yes
e2e_img | Presents a series of bitmaps; once with straight orientation and once rotated by 5 degrees to the right. The first pair of bitmaps is in PNG format, while the second pair is in JPG format. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_img) | [Demo](https://run.pavlovia.org/tpronk/e2e_img/html) | Yes
e2e_polygons | Presents a series of polygons; once with straight orientation and once rotated by 5 degrees to the right. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_polygons) | [Demo](https://run.pavlovia.org/tpronk/e2e_polygons/html) | Yes
e2e_slider | Presents a slider. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_slider) | [Demo](https://run.pavlovia.org/tpronk/e2e_slider) | Yes
e2e_text | Presents a series of words in Turkish, Chinese, and Arabic script. Each word is presented once in Arial and once in Georgia font. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_text) | [Demo](https://run.pavlovia.org/tpronk/e2e_text/html) | Yes
e2e_textbox | Presents an editable textbox and shows the text that was typed in. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_textbox) | [Demo](https://run.pavlovia.org/tpronk/e2e_textbox/html) | Yes
e2e_video | Presents video that consists of a green square without sound. | [GitLab](https://gitlab.pavlovia.org/tpronk/e2e_video) | [Demo](https://run.pavlovia.org/tpronk/e2e_video) | No
