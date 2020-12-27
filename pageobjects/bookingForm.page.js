import * as base from '../common/base-function-xpath';

const element = {
  detailBookingText: '//div[text()="Detail Pemesanan"]',
  detailBookTrainText: '//div[text()="Detail Perjalanan"]',
  startStationText: '//div[@class="trip"]/span[1]',
  finishStationText: '//div[@class="trip"]/span[2]',
  dateStartDepature: '//div[@class="trip-description"]/span[3]',
  timeStartDepature: '//div[@class="trip-description"]/span[5]',
  priceText: '//div[@class="footer__info main__price"]/span',
  priceTrainText: '//div[@class="price"]',
  nextPaymentButton: '//button[text()="LANJUT KE PEMBAYARAN"]',
  nextPaymentTrain: '//button[text()="Lanjutkan ke Pembayaran"]',
  sameWithPassenger: '//div[@class="lever"]',
  identityNumber: '//input[@name="identityNumber"]',
  savePassengerDetail: '//button[@type="submit"]',
  chooseSeat: '//button[@class="btn btn-choose-seat"]',
  okConfirmTrain: '//button[.="Ya, Lanjutkan"]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.detailBookingText);
};

export const verifyPageTrain = async () => {
  await base.waitElementVisible(element.detailBookTrainText);
};

export const getDetailBooking = async () => {
  const startStation = await base.getStringText(element.startStationText);
  const finishStation = await base.getStringText(element.finishStationText);
  const dateStart = await base.getStringText(element.dateStartDepature);
  const timeStart = await base.getStringText(element.timeStartDepature);

  const text = {
    startStation,
    finishStation,
    dateStart,
    timeStart,
  };

  return text;
};

export const sameWithPassenger = async () => {
  await base.clickElement(element.sameWithPassenger);
  await base.setValueElement(element.identityNumber, '3273260101200100');
  await base.clickElement(element.savePassengerDetail);
};

export const scrollToNextPayment = async () => {
  await base.scrollToElement(element.nextPaymentButton);
};

export const clickNextToPayment = async () => {
  await base.clickElement(element.nextPaymentButton);
};

export const getPriceText = async () => {
  const totalPrice = await base.getStringText(element.priceText);

  return totalPrice;
};

export const getPriceTrainText = async () => {
  await base.scrollToBottom();
  const totalPrice = await base.getStringText(element.priceTrainText);

  return totalPrice;
};

export const fillTrainIdentity = async (adultNumber, infantNumber) => {
  await base.fillAdultIdentity(adultNumber);
  await base.fillInfantIdentity(adultNumber, infantNumber);
};

export const chooseSeat = async () => {
  await base.clickElement(element.chooseSeat);
};

export const clickNextToPaymentTrain = async () => {
  await base.clickElement(element.nextPaymentTrain);
  await base.clickElement(element.okConfirmTrain);
};
