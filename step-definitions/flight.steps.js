import { When } from 'cucumber';
import * as homePage from '../pageobjects/home.page';
import * as loginPage from '../pageobjects/login.page';
import * as accountPage from '../pageobjects/account.page';

let itemTransaction = {};

When(/^the user login use email with "([^"]*)" as email and "([^"]*)" as password$/, async (username, password) => {
  await homePage.clickAccountButton();
  await loginPage.verifyPage();
  await loginPage.loginWithEmail(username, password);
  await loginPage.clickNextTime();
  await loginPage.clickUnderstandButton();
  const accountName = await accountPage.getAccountName();
  itemTransaction = { ...itemTransaction, ...{ accountName } };
  await homePage.clickHomeButton();
});

// always need otp in new device
