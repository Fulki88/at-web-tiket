import * as base from '../common/base-function-xpath';
import * as baseCss from '../common/base-function-css';

const element = {
  titlePage: '//div[@class="fix-header"]//div[@class="center-column-wrapper"]',
  startStation: '//div[@class="tab-content show"]//p[text()="Dari"][1]//following::p[@class="search-form-value placeholder"][1]',
  finishStation: '//div[@class="tab-content show"]//p[text()="Ke"][1]//following::p[@class="search-form-value placeholder"][1]',
  typeStation: '//div[@class="background-overlay tiketpop show-popup full-popup"]//input[@name="searchKeyword"]',
  firstStation: '//div[@class="background-overlay tiketpop show-popup full-popup"]//li[@class="city"]//div[@class="station-city"]',
  completeAdultInfant: '//div[@class="background-overlay tiketpop show-popup drawer-popup"]//div[@class="button-bottom"]',
  findTrainButton: '//button[text()="Cari Kereta Api"]',
  textStartDate: '//div[@class="tab-content show"]//span[@data-test="calendar-departure-button"]/p',
  textAdultInfant: '//div[@class="tab-content show"]//p[text()="Penumpang"]//following::p[@class="search-form-value"]',

  // css
  startDate: 'div.show [data-test="calendar-departure-button"] > .search-form-value',
  chooseAdultInfant: 'div.show [data-test="passengers-button"] > .search-form-value',
};

const elFunction = (text) => ({
  firstDestination: `//div[@class="list-item-wrap"][1]//span[text()="${text}"]`,
  chooseDate: `//div[@class="tab-content show"]//div[text()=${text}]`,
});

export const verifyPage = async () => {
  await base.assertContainsText(element.titlePage, 'Kereta');
  await base.waitElementVisible(element.startStation);
};

export const chooseStartEndStation = async () => {
  await base.clickElement(element.startStation);
  await base.setValueElement(element.typeStation, 'Bandung');
  await base.clickElement(element.firstStation);
  await base.clickElement(element.finishStation);
  await base.setValueElement(element.typeStation, 'Yogyakarta');
  await base.clickElement(element.firstStation);
};

export const chooseDate = async (daysFromNow) => {
  await baseCss.clickElementViaInject(element.startDate);
  const choosenDay = await base.generateNextDay(daysFromNow);
  await base.clickElement(elFunction(choosenDay).chooseDate);
};

export const chooseAdultInfant = async (adult, infant) => {
  await baseCss.clickElementViaInject(element.chooseAdultInfant);
  await base.dragAndDrop(adult, 'Dewasa');
  await base.dragAndDrop(infant, 'Bayi');
  await base.clickElement(element.completeAdultInfant);
};

export const clickFindTrain = async () => {
  await base.pause(1000);
  await base.clickElement(element.findTrainButton);
};

export const getDetailSearch = async () => {
  const textAdultInfant = (await base.getStringText(element.textAdultInfant)).split(', ');

  const text = {
    adultTotal: textAdultInfant[0],
    infantTotal: textAdultInfant[1],
  };

  return text;
};
