# Modules that support the end-to-end testing workflow

The table below lists support modules. For each module, it lists:
* **Name.** Name of the module
* **Description.** What the module does
* **Environment.** Environment variables that the module requires

Name | Description | Environment 
:--- | :--- | :--- 
BrowserStack.js | Makes HTTP requests to [BrowserStack's REST API](https://www.browserstack.com/docs/automate/api-reference/selenium/introduction) | BROWSERSTACK_USER, BROWSERSTACK_ACCESSKEY
capabilities.bs.js | Generates WebDriverIO capabilities for running tests on BrowserStack | (none)
capabilities.local.js | Generates WebDriverIO capabilities for running tests on a local Selenium server | (none)
GitHub.js | Makes HTTP requests to [GitHub's REST API](https://docs.github.com/en/free-pro-team@latests/rest) | (none)
ReportSummarizer.js | Summarizes logs from the [WebdriverIO JSON Reporter](https://webdriver.io/docs/wdio-json-reporter.html) | (none)
SharedBehaviors.js | A collection of WebDriverIO behaviors and Jasmine assertions for running all tests in a single session | (none)
Stager.js | Makes FTP requests to the PsychoPy staging server| STAGING_PORT, STAGING_USERNAME, STAGING_PASSWORD
VisualRegressor.js | Performs visual regression tests of browser screenshots | (none)
