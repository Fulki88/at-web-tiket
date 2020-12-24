/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const { client } = require('nightwatch-api');

const timeOut = 5000;

export const pause = async (time) => await client.pause(time);

// wait until element is visible
export const waitElementVisible = async (xpathQuery) => {
  await client.useXpath();
  await client.waitForElementPresent(xpathQuery, timeOut);
  await client.waitForElementVisible(xpathQuery, timeOut);
};

// wait until element visible
export const waitUntilElementVisible = async (xpathQuery) => {
  // await client.waitForElementVisible(`${xpathQuery}:visible`, timeOut);
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

// click element wait for visible
export const clickElement = async (xpathQuery) => {
  await waitElementVisible(xpathQuery);
  await client.click(xpathQuery);
};

// expect to be visible
export const expectVisible = async (xpathQuery) => {
  await waitElementVisible(xpathQuery);
  return client.expect.element(xpathQuery).to.be.visible;
};

// set value to element
export const setValueElement = async (xpathQuery, value) => {
  await waitElementVisible(xpathQuery);
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

// check if the given element equal the specific text
// export const assertEqualText = async (actualText, ExpectedText) => {
//   await waitElementVisible(actualText);
//   return client.assert.equalText(actualText, ExpectedText);
// };

// check if the given element contains the specific text
export const assertContainsText = async (xpathQuery, expectedText) => {
  await waitElementVisible(xpathQuery);
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
export const dragAndDrop = async (interval, guestRoom) => {
  let dragFromSelector;
  const intervalCount = interval - 1;

  switch (guestRoom) {
    case 'Kamar':
      dragFromSelector = '//div[@class="rmc-picker"][1]//div[text()=1]';
      break;
    case 'Tamu':
      dragFromSelector = '//div[@class="rmc-picker"][2]//div[text()=1]';
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
      .mouseButtonUp(0)
      .mouseButtonUp(0);

    dragFromSelector = dragFromSelector.replace(`=${i + 1}]`, `=${i + 2}]`);
  }
  await client.pause(1000);
};
