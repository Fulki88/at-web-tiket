import * as base from '../common/base-function-xpath';

const element = {
  pageTitle: '//p[@class="page-title"]',
  filterButton: '//button[text()="Filter"]',
  lastDepatureTime: '//label[text()="18:00 - 24:00"]',
  confirmFilter: '//button[text()="TERAPKAN"]',
  sortButton: '//button[text()="Urutkan"]',
  earliestDeparture: '//label[text()="Keberangkatan paling awal"]',
  firstIndexTrain: '//div[@class="train-list-item  "][1]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.pageTitle);
  await base.waitElementVisible(element.filterButton);
  await base.waitElementVisible(element.sortButton);
  await base.waitElementVisible(element.firstIndexTrain);
};

export const filterTrain = async () => {
  await base.clickElement(element.filterButton);
  await base.clickElement(element.lastDepatureTime);
  await base.clickElement(element.confirmFilter);
};

export const sortEarliest = async () => {
  await base.clickElement(element.sortButton);
  await base.clickElement(element.earliestDeparture);
};

export const clickFirstTrain = async () => {
  await base.clickElement(element.firstIndexTrain);
};
