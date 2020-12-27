import * as base from '../common/base-function-xpath';

const element = {
  dateHotel: '//div[@class="date ellipsis"]',
  filterButton: '//div[text()="Filter"]',
  maxPrice: '//div[@class="price-textbox-wrap"]/div[@class="price-textbox"][2]/input',
  confirmFilter: '//button[text()="Terapkan"]',
  sortButton: '//div[text()="Urutkan"]',
  sortExpensive: '//div[text()="Harga (termahal lebih dulu)"]',
  firstIndexHotel: '//div[@data=\'{"position":1,"index":1}\']',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.dateHotel);
  await base.waitElementVisible(element.filterButton);
  await base.waitElementVisible(element.sortButton);
  await base.waitElementVisible(element.firstIndexHotel);
};

export const filterHotel = async (maxPrice) => {
  await base.clickElement(element.filterButton);
  await base.clickElement(element.maxPrice);
  await base.setValueElement(element.maxPrice, maxPrice);
  await base.clickElement(element.confirmFilter);
};

export const sortExpensive = async () => {
  await base.clickElement(element.sortButton);
  await base.clickElement(element.sortExpensive);
};

export const clickFirstHotel = async () => {
  await base.clickElement(element.firstIndexHotel);
  await base.switchWindows();
  await base.switchWindows();
};
