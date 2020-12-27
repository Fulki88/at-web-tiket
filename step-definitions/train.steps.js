import { Then, When } from 'cucumber';
import * as homePage from '../pageobjects/home.page';
import * as trainPage from '../pageobjects/train.page';
import * as listTrainPage from '../pageobjects/listTrain.page';
import * as bookingPage from '../pageobjects/bookingForm.page';
import * as paymentPage from '../pageobjects/payment.page';
import * as myOrderPage from '../pageobjects/myOrder.page';

let itemTransaction = {};
let adultNumber;
let infantNumber;

When(/^the user search train with "(\d)" adults and "(\d)" infants and select seats in one-way trip "(\d)" days from today$/, async (adultsNumber, infantsNumber, daysFromNow) => {
  adultNumber = adultsNumber;
  infantNumber = infantsNumber;

  await homePage.clickTrain();
  await trainPage.verifyPage();
  await trainPage.chooseStartEndStation();
  await trainPage.chooseDate(daysFromNow);
  await trainPage.chooseAdultInfant(adultsNumber, infantsNumber);
  const getSearchText = await trainPage.getDetailSearch();
  itemTransaction = { ...itemTransaction, ...getSearchText };
  await trainPage.clickFindTrain();
});

When(/^the user use filter for 18:00 -24:00 departure time$/, async () => {
  await listTrainPage.verifyPage();
  await listTrainPage.filterTrain();
  await listTrainPage.sortEarliest();
});

When(/^the user choose first results train$/, async () => {
  await listTrainPage.clickFirstTrain();
});

When(/^the user complete train payment with non instant payment$/, async () => {
  await bookingPage.verifyPageTrain();

  const detailBookingText = await bookingPage.getDetailBooking();
  itemTransaction = { ...itemTransaction, ...detailBookingText };

  await bookingPage.sameWithPassenger();
  await bookingPage.fillTrainIdentity(adultNumber, infantNumber);

  const totalPrice = await bookingPage.getPriceTrainText();
  itemTransaction = { ...itemTransaction, ...{ totalPrice } };

  await bookingPage.chooseSeat();
  await bookingPage.clickNextToPaymentTrain();
  await paymentPage.verifyPage();
  await paymentPage.payUsingATM();
  await paymentPage.clickPayButton();
  await paymentPage.clickTransacionDetailButton();
});

Then(/^train transaction is created$/, async () => {
  await myOrderPage.verifyPage();
  await myOrderPage.clickFirstOrderTrain();
});
