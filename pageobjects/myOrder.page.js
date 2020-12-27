import * as base from '../common/base-function-xpath';

const element = {
  titlePage: '//div[text()="My Order"]',
  firstOrder: '//div[@class="card card-order"][1]//div[@class="order-details name"]',
  totalPrice: '//div[@class="price-box"]//p[@class="price"]',
  productName: '//p[@class="product-title"]',
  proudctTrainName: '//div[@class="trip-path"]',
  guestName: '//p[text()="Detail Tamu"]/following-sibling::p',
  checkInDate: '//p[text()="Check In"]/following-sibling::p',
  checkOutDate: '//p[text()="Check Out"]/following-sibling::p',
  roomType: '//p[text()="Kamar"]/following-sibling::p[1]',
  roomTotal: '//p[text()="Kamar"]/following-sibling::p[2]/span[1]',
  guestTotal: '//p[text()="Kamar"]/following-sibling::p[2]/span[3]',
  backArrow: '//span[@role="button"]//i[@class="tix tix-arrow-left"]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.titlePage);
};

export const clickFirstOrderHotel = async () => {
  await base.doubleClickMouse(element.titlePage);
  await base.clickElement(element.firstOrder);
  await base.doubleClickMouse(element.productName);
};

export const clickFirstOrderTrain = async () => {
  await base.doubleClickMouse(element.titlePage);
  await base.clickElement(element.firstOrder);
  await base.doubleClickMouse(element.proudctTrainName);
};

export const verifyDetail = async (itemTransaction) => {
  await base.assertContainsText(element.totalPrice, itemTransaction.totalPrice);
  await base.assertContainsText(element.productName, itemTransaction.productName);
  await base.assertContainsText(element.guestName, itemTransaction.guestName);
  await base.assertContainsText(element.checkInDate, itemTransaction.checkInDate);
  await base.assertContainsText(element.checkOutDate, itemTransaction.checkOutDate);
  await base.assertContainsText(element.roomType, itemTransaction.roomType);
  await base.assertContainsText(element.roomTotal, itemTransaction.roomTotal);
  await base.assertContainsText(element.guestTotal, itemTransaction.guestTotal);
};

export const verifyTrainDetail = async (itemTransaction) => {
  await base.assertContainsText(element.productName, itemTransaction.productName);
  await base.assertContainsText(element.guestName, itemTransaction.guestName);
  await base.assertContainsText(element.checkInDate, itemTransaction.checkInDate);
  await base.assertContainsText(element.checkOutDate, itemTransaction.checkOutDate);
  await base.assertContainsText(element.roomType, itemTransaction.roomType);
  await base.assertContainsText(element.roomTotal, itemTransaction.roomTotal);
  await base.assertContainsText(element.guestTotal, itemTransaction.guestTotal);
};

export const clickBackArrow = async () => {
  await base.clickElement(element.backArrow);
};
