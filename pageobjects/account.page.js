import * as base from '../common/base-function-xpath';

const element = {
  titlePage: '//h2[text()="Akun"]',
  logoutButton: '//div[@class="logout"]',
  confirmLogout: '//span[@class="logout-yes"]',
  accountName: '//div[@class="profile-name"]/h1',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.titlePage);
};

export const clickLogoutButton = async () => {
  await base.scrollToBottom();
  await base.doubleClickMouse(element.logoutButton);
  await base.clickElement(element.confirmLogout);
};

export const getAccountName = async () => {
  const accountName = await base.getStringText(element.accountName);

  return accountName;
};
