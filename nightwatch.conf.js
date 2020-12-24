const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  silent: !process.env.NIGHTWATCH_VERBOSE,
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        port: 4444,
      },
      screenshots: {
        enabled: true,
        path: 'screenshots',
      },
    },
    chromeHeadless: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4444'],
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false,
          args: ['--headless'],
        },
      },
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4444'],
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          mobileEmulation: {
            deviceMetrics: { width: 495, height: 600 },
          },
          args: [
            '--window-size=500,768',
            '--user-agent=Mozilla/5.0 (Linux; Android 9; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
            'disable-infobars',
            'disable-popup-blocking',
            'disable-notifications',
          ],
        },
      },
    },
  },
};
