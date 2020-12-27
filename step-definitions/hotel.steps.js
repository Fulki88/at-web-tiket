import { Then, When } from 'cucumber';
import * as homePage from '../pageobjects/home.page';
import * as hotelPage from '../pageobjects/hotel.page';
import * as listHotelPage from '../pageobjects/listHotel.page';
import * as detailHotelPage from '../pageobjects/detailHotel.page';
import * as loginPage from '../pageobjects/login.page';
import * as bookingPage from '../pageobjects/bookingForm.page';
import * as paymentPage from '../pageobjects/payment.page';
import * as myOrderPage from '../pageobjects/myOrder.page';
import * as accountPage from '../pageobjects/account.page';

let itemTransaction = {};

When(/^the user login facebook with "([^"]*)" as username and "([^"]*)" as password$/, async (username, password) => {
  await homePage.clickAccountButton();
  await loginPage.verifyPage();
  await loginPage.loginWithFacebook(username, password);
  await loginPage.fromFBPageToTiket();
  await loginPage.clickNextTime();
  const accountName = await accountPage.getAccountName();
  itemTransaction = { ...itemTransaction, ...{ accountName } };
  await homePage.clickHomeButton();
});

When(/^the user search hotel with date "(\d)" days from today, "([^"]*)" guest and "(\d)" room$/, async (daysFromNow, guestsNumber, roomsNumber) => {
  await homePage.clickHotel();
  await hotelPage.verifyPage();
  await hotelPage.chooseDestination();
  await hotelPage.chooseDate(daysFromNow);
  await hotelPage.chooseGuestRoom(guestsNumber, roomsNumber);
  const getSearchText = await hotelPage.getDetailSearch();
  itemTransaction = { ...itemTransaction, ...getSearchText };
  await hotelPage.clickFindHotel();
});

When(/^the user filter results with Rp."([^"]*)" max prices$/, async (maxPrice) => {
  await listHotelPage.verifyPage();
  await listHotelPage.filterHotel(maxPrice);
  await listHotelPage.sortExpensive();
});

When(/^the user choose first results hotel$/, async () => {
  await listHotelPage.clickFirstHotel();
  await detailHotelPage.verifyPage();
  const productName = await detailHotelPage.getProductName();
  itemTransaction = { ...itemTransaction, ...{ productName } };
  await detailHotelPage.clickSeeRoom();
  const roomType = await detailHotelPage.getRoomTypeName();
  itemTransaction = { ...itemTransaction, ...{ roomType } };
  await detailHotelPage.clickChooseRoom();
});

When(/^the user complete hotel payment with non instant payment$/, async () => {
  await bookingPage.verifyPage();
  await bookingPage.scrollToNextPayment();
  const totalPrice = await bookingPage.getPriceText();
  itemTransaction = { ...itemTransaction, ...{ totalPrice } };
  await bookingPage.clickNextToPayment();
  await paymentPage.verifyPage();
  await paymentPage.payUsingATM();
  await paymentPage.clickPayButton();
  await paymentPage.clickTransacionDetailButton();
});

Then(/^hotel transaction is created$/, async () => {
  await myOrderPage.verifyPage();
  await myOrderPage.clickFirstOrder();
  await myOrderPage.verifyDetail(itemTransaction);
});
