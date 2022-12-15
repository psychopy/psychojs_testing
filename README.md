# psychojs_testing
Scripts for automated testing of [PsychoJS](https://github.com/psychopy/psychojs) and associated libraries. See the [wiki](../../wiki) for detailed documentation on installing, using, or extending psychojs_testing. Read on for a brief overview of the features.

## Overview of features
* We support [unit testing via karma](../../wiki/Karma-testing) and [end-to-end testing via WebdriverIO](../../wiki#webdriverio-testing)
* Screenshots can taken automatically and be subjected to a [visual regression test](../../wiki/Visual-regression-testing-of-screenshots)
* Tests can be coordinated by your [local device](../../wiki/Test-script-shorthands) or via [GitHub Actions](../../wiki/Github-Workflows)
* Test clients can be your [local browsers](../../wiki/Setting-up-a-Selenium-or-Appium-server#setting-up-a-local-selenium-server) or a collection of [BrowserStack devices](../../wiki/Setting-up-a-Selenium-or-Appium-server#setting-up-a-local-selenium-server)
* Tests can be hosted by your [local webserver](.../../wiki/Installation#d-install-a-local-webserver), a [staging server](../../wiki/Installation#f-staging-server), or any other [server that offers a URL](wiki/Testrun-CLI-options) (like [Pavlovia](https://pavlovia.org/))
* There are some [shorthand commands](.../../wiki/Test-script-shorthands) for easily running standard testing scenarios and a whole bunch of [CLI options](.../../wiki/Testrun-CLI-options) to run specific steps only
* A series of tests can be run in one go by giving them a [label](../../wiki/Test-configuration-file)
* A plethora of test logs are available, summarized in a [handy table](../../wiki/Organization-of-test-logs)
* There is a [collection of tests](../../wiki/Overview-of-tests) already available, but be welcome to add more!



