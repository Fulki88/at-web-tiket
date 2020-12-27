import * as base from '../common/base-function-xpath';

const element = {
  hotelTitle: '//h1[@class="property-name tix-font h4 line-clamp-2"]',
  seeRoomButton: '//button[text()="LIHAT KAMAR"]',
  firstRoomType: '//div[@class="room-card"][1]//div[@class="room-card__title line-clamp-2"]',
  firstBedType: '//div[@class="room-card"][1]//span[@class="ellipsis"]',
  firstChooseRoomButton: '//div[@class="room-card"][1]//button[text()="Pilih"]',
  firstPrice: '//div[@class="room-card"][1]//span[@class="price"]',
  productName: '//h1[@class="property-name tix-font h4 line-clamp-2"]',
  roomType: '//div[@class="room-card__title line-clamp-2"]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.hotelTitle);
  await base.waitElementVisible(element.seeRoomButton);
};

export const clickSeeRoom = async () => {
  await base.clickElement(element.seeRoomButton);
};

export const clickChooseRoom = async () => {
  await base.clickElement(element.firstChooseRoomButton);
};

export const getProductName = async () => {
  const productName = await base.getStringText(element.productName);

  return productName;
};

export const getRoomTypeName = async () => {
  await base.waitElementVisible(element.roomType);
  const roomTypeName = await base.getStringText(element.roomType);

  return roomTypeName;
};
