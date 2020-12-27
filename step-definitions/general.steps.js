import { Given, Then } from 'cucumber';
import { client } from 'nightwatch-api';
import * as homePage from '../pageobjects/home.page';
import * as myOrderPage from '../pageobjects/myOrder.page';
import * as accountPage from '../pageobjects/account.page';

Given(/^a web browser is on the Tiket.com page$/, async () => {
  await client.url('http://tiket.com');
  await homePage.verifyPage();
});

Then(/^the user logout$/, async () => {
  await myOrderPage.clickBackArrow();
  await homePage.clickAccountButton();
  await accountPage.verifyPage();
  await accountPage.clickLogoutButton();
});
