import { Given, Then, When } from 'cucumber';
import { client } from 'nightwatch-api';
import * as homePage from '../pageobjects/home.page';
import * as hotelPage from '../pageobjects/hotel.page';
import * as listHotelPage from '../pageobjects/listHotel.page';

Given(/^a web browser is on the Tiket.com page$/, async () => {
  await client.url('http://tiket.com');
});

When(/^the user login facebook with "([^"]*)" as email and "([^"]*)" as password$/, async (email, password) => {
  // await client.assert.title(text);
});

When(/^the user search hotel with "(\d)" days from today, "([^"]*)" guest and "(\d)" room$/, async (daysFromNow, guestsNumber, roomsNumber) => {
  await homePage.verifyPage();
  await homePage.clickHotel();
  await hotelPage.verifyPage();
  await hotelPage.chooseDestination();
  await hotelPage.chooseDate(daysFromNow);
  await hotelPage.chooseGuestRoom(guestsNumber, roomsNumber);
  await hotelPage.clickFindHotel();
});

When(/^the user filter results with Rp."([^"]*)" max prices$/, async (maxPrice) => {
  await listHotelPage.verifyPage();
  await listHotelPage.filterHotel(maxPrice);
  await listHotelPage.sortCheapest();
  await listHotelPage.clickFirstHotel();
});

When(/^the user choose first results hotel$/, async () => {
  // await client.assert.visible('#search_form_homepage');
});

When(/^the user complete payment with non instant payment$/, async () => {
  // await client.assert.visible('#search_form_homepage');
});

Then(/^transaction is created$/, async () => {
  // await client.assert.visible('#search_form_homepage');
});

Then(/^the user logout$/, async () => {
  // await client.assert.visible('#search_form_homepage');
});
