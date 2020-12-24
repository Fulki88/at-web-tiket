/* eslint-disable func-names */
/* eslint-disable no-undef */
const { client } = require('nightwatch-api');

const timeOut = 5000;

// wait until element is visible
export const waitElementVisible = async (selector) => {
  await client.useCss();
  await client.waitForElementPresent(selector, timeOut);
  await client.waitForElementVisible(selector, timeOut);
};

// scroll to element
export const scrollToElement = async (selector) => {
  await waitElementVisible(selector);
  await client.moveToElement(selector, 0, 0);
};

// click element wait for visible
export const clickElement = async (selector) => {
  await waitElementVisible(selector);
  await client.click(selector);
};

// set value to element
export const setValueElement = async (selector, value) => {
  await waitElementVisible(selector);
  await client.clearValue(selector);
  await client.setValue(selector, value);
};

// click element via inject
export const clickElementViaInject = async (elementSelector) => {
  await client.pause(500);
  await waitElementVisible(elementSelector);
  // eslint-disable-next-line prefer-arrow-callback
  await client.execute(function (selector) {
    document.querySelector(selector).click();
  }, [elementSelector]);
};

// change transform via inject
export const changeTransformViaInject = async (elementSelector, howMuch) => {
  const padding = 51;
  const result = padding * (howMuch - 1);

  await client.pause(500);
  await waitElementVisible(elementSelector);
  // eslint-disable-next-line prefer-arrow-callback
  await client.execute(function (selector, res) {
    document.querySelector(selector).style.transform = `translate3d(0px, -${res}px, 0px)`;
    document.querySelector(selector).style.transform = `translate3d(0px, -${res}px, 0px)`;
  }, [elementSelector, result]);
};
