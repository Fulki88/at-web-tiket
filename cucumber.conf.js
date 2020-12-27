const fs = require('fs');

const {
  setDefaultTimeout, After, AfterAll, Before, BeforeAll,
} = require('cucumber');

const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  getNewScreenshots,
} = require('nightwatch-api');
// const reporter = require('cucumber-html-reporter');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'chromeHeadless' });
});

Before(async () => {
  await createSession();
});

AfterAll(async () => {
  // setTimeout(() => {
  //   reporter.generate({
  //     theme: 'bootstrap',
  //     jsonFile: 'report/cucumber_report.json',
  //     output: 'report/cucumber_report.html',
  //     reportSuiteAsScenarios: true,
  //     launchReport: false,
  //     metadata: {
  //       'App Version': '0.3.2',
  //       'Test Environment': 'POC',
  //     },
  //   });
  // }, 1000);
  await stopWebDriver();
});

After(async () => {
  await closeSession();
  // getNewScreenshots().forEach((file) => this.attach(fs.readFileSync(file), 'image/png'));
});
