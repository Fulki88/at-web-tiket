import * as base from '../common/base-function-xpath';

const element = {
  logoTiket: '//img[@alt="Logo-Tiketcom"]',
  planeBox: '//a[@href="/pesawat"]/div',
  hotelBox: '//a[@href="/hotel"]/div',
  trainBox: '//a[@href="/kereta-api"]/div',
  destinationPlace: '//div[@class="search-input-div empty-input"]',
  homeButton: '//a[@href="https://m.tiket.com"]',
  accountButton: '//a[@href="/myaccount"]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.logoTiket);
  await base.waitElementVisible(element.planeBox);
  await base.waitElementVisible(element.hotelBox);
  await base.waitElementVisible(element.trainBox);
};

export const clickHotel = async () => {
  await base.clickElement(element.hotelBox);
};

export const clickTrain = async () => {
  await base.clickElement(element.trainBox);
};

export const clickHomeButton = async () => {
  await base.clickElement(element.homeButton);
};

export const clickAccountButton = async () => {
  await base.clickElement(element.accountButton);
};
