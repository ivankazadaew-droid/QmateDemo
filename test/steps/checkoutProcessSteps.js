import { Given, When, Then } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';

import HomePage from '../pageobjects/home.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import OrderSummary from '../pageobjects/orderSummary.page.js';
import OrderCompletedPage from '../pageobjects/orderCompleted.page.js';
import { takeScreenshotAndAttach } from '../utils/allure.utils.js';

Given('the user is on the home page', async function () {
  await HomePage.open();
  await HomePage.waitForPageToLoad();
  await takeScreenshotAndAttach();
});

When('the user adds a product to the cart', async function () {
  await HomePage.clickAddItemButton();
  await HomePage.clickCartButton();
  await takeScreenshotAndAttach();
});

When('the user proceeds to checkout', async function () {
  await HomePage.clickProceedCartButton();
  await takeScreenshotAndAttach();
});

When('the user choses payment type', async function () {
  await CheckoutPage.waitForPageToLoad();
  await CheckoutPage.clickStep2Button();
  await takeScreenshotAndAttach();
});

When('the user fills in card details', async function () {
  const cardHolderName = faker.person.fullName();
  let rawCardNumber = faker.finance.creditCardNumber(); 
  const cardNumber = rawCardNumber.replace(/\D/g, '').substring(0, 16);
  const securityCode = faker.finance.creditCardCVV(); 
  const futureMonth = faker.date.future({ years: 5 }).getMonth() + 1;
  const futureYear = faker.date.future({ years: 5 }).getFullYear();
  const expirationDate = `${futureMonth.toString().padStart(2, '0')}/${futureYear}`; 

  await CheckoutPage.clickStep3Button();
  await takeScreenshotAndAttach();
  
  await CheckoutPage.inputCardHolderName(cardHolderName);
  await CheckoutPage.inputCardNumber(cardNumber);
  await CheckoutPage.inputSecurityCode(securityCode);
  await CheckoutPage.inputExpirationDate(expirationDate);
  await common.userInteraction.pressEnter();
  await takeScreenshotAndAttach();
});

When('the user fills in invoice address details', async function () {
  const streetName = faker.location.street(); 
  const houseNumber = faker.string.numeric(1);
  const address = `${streetName.split(' ')[0]} ${houseNumber}`;
  const city = faker.location.city();
  const zipCode = faker.location.zipCode('#####');
  const country = faker.location.country();
  
  await CheckoutPage.clickStep4Button();
  await takeScreenshotAndAttach();

  await CheckoutPage.inputAddress(address);
  await CheckoutPage.inputCity(city);
  await CheckoutPage.inputZipCode(zipCode);
  await CheckoutPage.inputCountry(country);
  await common.userInteraction.pressEnter();
  await takeScreenshotAndAttach();
});

When('the user choses delivery type', async function () {
  await CheckoutPage.clickStep5Button();
  await takeScreenshotAndAttach();
});

When('the user reviews the order summary', async function () {
  await CheckoutPage.clickOrderSummaryButton();
  await OrderSummary.waitForPageToLoad();
  await takeScreenshotAndAttach();
});

Then('the user submits the order', async function () {
  await OrderSummary.clickSubmitButton();
  await takeScreenshotAndAttach();

  await OrderSummary.clickConfirmationModalYesButton();
});

Then('the order is successfully completed', async function () {
  await OrderCompletedPage.waitForPageToLoad();

  const successMessageText = await OrderCompletedPage.getSuccessMessageText();
  const expectedText = "Thank you for your order!";
  
  await common.assertion.expectToContain(successMessageText, expectedText);
  await takeScreenshotAndAttach();
});