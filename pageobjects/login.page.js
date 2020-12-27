import * as base from '../common/base-function-xpath';
import * as baseCss from '../common/base-function-css';

const element = {
  pageTitle: '//h2[text()="Log in/Daftar"]',
  usernameField: '//input[@name="username"]',
  passwordField: '//input[@name="password"]',
  submitButton: '//button[text()="Lanjutkan"]',
  emailLoginButton: '//button[text()="Log in"]',
  nextTimeButton: '//button[text()="NANTI SAJA"]',
  understandButton: '//span[text()="MENGERTI"]',
  facebookSignIn: '//div[@class="btn-signup waves-effect waves-light btn-socmed facebook"]',
  facebookUsername: '//input[@id="m_login_email"]',
  facebookPassword: '//input[@id="m_login_password"]',
  // css
  facebookLoginButton: 'button[name="login"]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.pageTitle);
  await base.waitElementVisible(element.usernameField);
};

export const loginWithEmail = async (email, password) => {
  await base.setValueElement(element.usernameField, email);
  await base.clickElement(element.submitButton);
  await base.clickElement(element.passwordField);
  await base.setValueElement(element.passwordField, password);
  await base.clickElement(element.emailLoginButton);
};

export const loginWithFacebook = async (username, password) => {
  await base.clickElement(element.facebookSignIn);
  await base.switchWindows();
  await base.setValueElement(element.facebookUsername, username);
  await base.setValueElement(element.facebookPassword, password);
  await baseCss.clickElementViaInject(element.facebookLoginButton);
};

export const fromFBPageToTiket = async () => {
  await base.handleWindowsAfterClose();
};

export const clickNextTime = async () => {
  await base.clickElement(element.nextTimeButton);
};

export const clickUnderstandButton = async () => {
  await base.clickElement(element.understandButton);
};
