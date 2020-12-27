/* eslint-disable no-return-await */
/* eslint-disable no-undef */
import datejs from 'date.js';
import randomstring from 'randomstring';

const { client } = require('nightwatch-api');

const timeOut = 7000;

export const pause = async (time) => await client.pause(time);

// wait until element is visible
export const waitElementVisible = async (xpathQuery) => {
  await client.useXpath();
  await client.waitForElementPresent(xpathQuery, timeOut);
  await client.waitForElementVisible(xpathQuery, timeOut);
};

// wait until element visible
export const waitUntilElementVisible = async (xpathQuery) => {
  await client.waitForElementVisible({
    locateStrategy: 'xpath',
    selector: xpathQuery,
  }, timeOut);
};

// scroll to element
export const scrollToElement = async (xpathQuery) => {
  await waitElementVisible(xpathQuery);
  await client.moveToElement(xpathQuery, 0, 0);
};

// scroll to bottom of page
export const scrollToBottom = async () => {
  client.execute('window.scrollTo(0,document.body.scrollHeight);');
};

// click element wait for visible
export const clickElement = async (xpathQuery) => {
  await pause(500);
  await waitElementVisible(xpathQuery);
  await client.click(xpathQuery);
};

// click element wait for visible
export const doubleClickMouse = async (xpathQuery) => {
  await pause(500);
  await waitElementVisible(xpathQuery);
  await client.moveToElement(xpathQuery, 0, 0);
  await client.doubleClick();
};

// expect to be visible
export const expectVisible = async (xpathQuery) => {
  await waitElementVisible(xpathQuery);
  return client.expect.element(xpathQuery).to.be.visible;
};

// set value to element
export const setValueElement = async (xpathQuery, value) => {
  await waitElementVisible(xpathQuery);
  await clickElement(xpathQuery);
  await client.clearValue(xpathQuery);
  await client.setValue(xpathQuery, value);
};

// get value name
export const expectElementEqualValue = async (xpathQuery, expectedValue) => {
  await waitElementVisible(xpathQuery);
  return client.expect.element(xpathQuery).to.have.value.that.equals(expectedValue);
};

// get string text
export const getStringText = async (xpathQuery) => {
  let text;
  await waitElementVisible(xpathQuery);
  await client.getText(xpathQuery, (result) => {
    text = result.value;
  });
  return text;
};

// check if the given element contains the specific text
export const assertContainsText = async (xpathQuery, expectedText) => {
  await scrollToElement(xpathQuery);
  await client.getText(xpathQuery, (result) => {
    client.assert.ok(result.value.indexOf(expectedText) !== 1, `Testing if element <${xpathQuery}> contains text that matches "${expectedText}"`);
  });
};

export const getElementsByXPath = async (xpath) => {
  const results = [];
  let query;
  await client.execute((xpathQuery) => {
    query = document.evaluate(xpathQuery, document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; i += 1) {
      results.push(query.snapshotItem(i));
    }
  }, [xpath]);
  return results;
};

// for change count room and guest
export const dragAndDrop = async (interval, indicator) => {
  let dragFromSelector;
  const intervalCount = interval - 1;

  switch (indicator) {
    case 'Kamar':
      dragFromSelector = '//div[@class="rmc-picker"][1]//div[text()=1]';
      break;
    case 'Tamu':
      dragFromSelector = '//div[@class="rmc-picker"][2]//div[text()=1]';
      break;
    case 'Dewasa':
      dragFromSelector = '//div[@class="rmc-picker"][1]//div[text()=1]';
      break;
    case 'Bayi':
      dragFromSelector = '//div[@class="rmc-picker"][2]//div[text()=1]';
      break;
    case 'Tahun Bayi':
      dragFromSelector = '//div[@class="rmc-picker"][3]/div[@class="rmc-picker-content"]/div[1]';
      break;
    default:
  }

  for (let i = 0; i < intervalCount; i += 1) {
    client
      .useXpath()
      .pause(500)
      .moveToElement(dragFromSelector, 0, 0)
      .doubleClick()
      .mouseButtonDown(0)
      .moveToElement(dragFromSelector, 0, -44)
      .pause(700)
      .mouseButtonUp(0);

    dragFromSelector = dragFromSelector.replace(`=${i + 1}]`, `=${i + 2}]`);
  }
  await client.pause(1000);
};

// switch windows to others tab page
export const switchWindows = async () => {
  await client.windowHandles((result) => {
    // 0 == current main window, 1 == new tab
    const handle = result.value[1];
    client.switchWindow(handle);
  });
  await client.useXpath();
};

// after close a new windows and handle current windows
export const handleWindowsAfterClose = async () => {
  // handle current windows
  client.windowHandles((result) => {
    const handle = result.value[0];
    client.pause(3000);
    client.switchWindow(handle);
  });
};

// for generate next day
export const generateNextDay = (howLongNextDay) => {
  const theDate = datejs(`${howLongNextDay} days from now`);
  const chooseDate = theDate.getDate();

  return chooseDate;
};

export const fillAdultIdentity = async (adultNumber) => {
  const str = 'DedewasaDewasaa';

  if (adultNumber > 1) {
    const arrayLoop = randomstring.generate(adultNumber);
    const loop = Object.keys(arrayLoop).map(async (element, index) => {
      const i = index + 2;
      await clickElement(`//div[@class="data-edit-box"][${i}]`);
      await setValueElement('//input[@name="fullName"]', str.substring(i, 12));
      await setValueElement('//input[@name="identityNumber"]', `327326010120000${i}`);
      await clickElement('//button[@type="submit"]');
    });

    await Promise.all(loop);
  }
};

export const fillInfantIdentity = async (adultNumber, infantNumber) => {
  const kid = 'BayiBayi';

  if (infantNumber > 0) {
    const arrayLoop = randomstring.generate((adultNumber + infantNumber));
    const loop = Object.keys(arrayLoop).map(async (element, index) => {
      const j = index + adultNumber;
      await clickElement(`//div[@class="data-edit-box"][${j}]`);
      await setValueElement('//input[@name="fullName"]', kid.substring(j, 12));
      await clickElement('//div[@class="form-row birthDate"]//input[1]');
      await dragAndDrop(3, 'Tahun Bayi');
      await clickElement('//div[@class="select-date-button"]');
      await clickElement('//button[@type="submit"]');
    });

    await Promise.all(loop);
  }
};
