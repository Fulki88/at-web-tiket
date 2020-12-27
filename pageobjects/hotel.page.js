import * as base from '../common/base-function-xpath';
import * as baseCss from '../common/base-function-css';

const element = {
  titlePage: '//div[@class="header  blue"]/div[@class="title"]',
  destinationPlace: '//div[@class="search-input-div empty-input"]',
  searchDestination: '//input[@placeholder="Mau ke mana?"]',
  todayCalender: '//div[text()="Hari ini"]/following-sibling::div',
  completeGuestRoom: '//button[text()="Selesai"][@type="button"]',
  findHotelButton: '//button[text()="Cari Hotel"][@type="button"]',
  textCheckInDate: '//div[text()="Check-in"]/following::div[@class="search-input-div"][1]',
  textCheckOutDate: '//div[text()="Check-out"]/following::div[@class="search-input-div"][1]',
  textGuestRoom: '//div[text()="Kamar & Tamu"]/following::div[@class="search-input-div"][1]',

  // css
  checkInDate: '.search-label.search-checkin .search-input-div',
  guestRoom: '.search-label.search-hotel-guest .search-input-div',
  changeRoom: '.rmc-picker:first-child .rmc-picker-content',
  changeGuest: '.rmc-picker:last-child .rmc-picker-content',
};

const elFunction = (text) => ({
  firstDestination: `//div[@class="list-item-wrap"][1]//span[text()="${text}"]`,
  chooseDate: `//div[@class="day-mod-body "][text()=${text}]`,
});

export const verifyPage = async () => {
  await base.assertContainsText(element.titlePage, 'Hotel');
  await base.waitElementVisible(element.destinationPlace);
};

export const chooseDestination = async () => {
  await base.clickElement(element.destinationPlace);
  await base.setValueElement(element.searchDestination, 'Bandung');
  await base.clickElement(elFunction('Bandung').firstDestination);
};

export const chooseDate = async (daysFromNow) => {
  await baseCss.clickElementViaInject(element.checkInDate);
  const choosenDay = await base.generateNextDay(daysFromNow);
  await base.clickElement(elFunction(choosenDay).chooseDate);
  await base.clickElement(elFunction(choosenDay + 1).chooseDate);
};

export const chooseGuestRoom = async (guest, room) => {
  await baseCss.clickElementViaInject(element.guestRoom);
  await base.dragAndDrop(guest, 'Tamu');
  await base.dragAndDrop(room, 'Kamar');
  await base.clickElement(element.completeGuestRoom);
};

export const clickFindHotel = async () => {
  await base.pause(1000);
  await base.clickElement(element.findHotelButton);
};

export const getDetailSearch = async () => {
  const textCheckInDate = await base.getStringText(element.textCheckInDate);
  const textCheckOutDate = await base.getStringText(element.textCheckOutDate);
  const textGuestRoom = (await base.getStringText(element.textGuestRoom)).split(', ');

  const text = {
    checkInDate: textCheckInDate,
    checkOutDate: textCheckOutDate,
    roomTotal: textGuestRoom[0],
    guestTotal: textGuestRoom[1],
  };

  return text;
};
