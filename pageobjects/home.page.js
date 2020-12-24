import * as base from '../common/base-function-xpath';

const element = {
  logoTiket: '//img[@alt="Logo-Tiketcom"]',
  planeBox: '//a[@href="/pesawat"]/div',
  hotelBox: '//a[@href="/hotel"]/div',
  trainBox: '//a[@href="/kereta-api"]/div',
  destinationPlace: '//div[@class="search-input-div empty-input"]',
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
