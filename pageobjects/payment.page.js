import * as base from '../common/base-function-xpath';

const element = {
  titlePage: '//p[text()="Pembayaran"]',
  atmPayment: '//div[@class="method-type-name"]/span[text()="ATM"]',
  mandiriPayment: '//div[@class="method-type-name"]/span[text()="Bank Mandiri"]',
  payButton: '//button[text()="Bayar"]',
  transactionDetailButton: '//button[text()="Lihat Daftar Pesanan"]',
  myOrderButton: '//button[text()="Ke My Order"]',
};

export const verifyPage = async () => {
  await base.waitElementVisible(element.titlePage);
};

export const payUsingATM = async () => {
  await base.scrollToElement(element.atmPayment);
  await base.clickElement(element.atmPayment);
};

export const payUsingTransferMandiri = async () => {
  await base.scrollToElement(element.mandiriPayment);
  await base.clickElement(element.mandiriPayment);
};

export const clickPayButton = async () => {
  await base.clickElement(element.payButton);
};

export const clickTransacionDetailButton = async () => {
  await base.clickElement(element.transactionDetailButton);
  await base.clickElement(element.myOrderButton);
};
