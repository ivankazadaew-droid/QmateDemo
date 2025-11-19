import { Given, When, Then } from '@cucumber/cucumber';
import allure from '@wdio/allure-reporter';

import HomePage from '../pageobjects/home.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import OrderSummary from '../pageobjects/orderSummary.page.js';
import OrderCompletedPage from '../pageobjects/orderCompleted.page.js';
import testDataGenerator from '../data/testDataGenerator.js';

Given(/^Home page is opened$|^Open Home page$/, async function () {
  await HomePage.open();
  await HomePage.waitForPageToLoad();
  await browser.takeScreenshot();
});

When('the user adds a product to the cart', async function () {
  await HomePage.clickAddItemButton();
  await HomePage.clickCartButton();
  await browser.takeScreenshot();
});

When('the user proceeds to checkout', async function () {
  await HomePage.clickProceedCartButton();
  await browser.takeScreenshot();
});

When('the user choses payment type', async function () {
  await CheckoutPage.waitForPageToLoad();
  await CheckoutPage.clickStep2Button();
  await browser.takeScreenshot();
});

When('the user fills in card details', async function () {
  const cardDetails = testDataGenerator.generateCardDetails();

  await CheckoutPage.clickStep3Button();
  await browser.takeScreenshot();

  await allure.step('Input cardholder name', async () => {
    await CheckoutPage.inputCardHolderName(cardDetails.cardHolderName);
    await browser.takeScreenshot();
  });
  
  await allure.step('Input card number', async () => {
    await CheckoutPage.inputCardNumber(cardDetails.cardNumber)
    await browser.takeScreenshot();
  });
  
  await allure.step('Input security code', async () => {
    await CheckoutPage.inputSecurityCode(cardDetails.securityCode);
    await browser.takeScreenshot();
  });

  await allure.step('Input expiration date', async () => {
    await CheckoutPage.inputExpirationDate(cardDetails.expirationDate);
    await common.userInteraction.pressEnter();
    await browser.takeScreenshot();
  });
});

When('the user fills in invoice address details', async function () {
  const addressDetails = testDataGenerator.generateAddressDetails();
  
  await CheckoutPage.clickStep4Button();
  await browser.takeScreenshot();

  await CheckoutPage.inputAddress(addressDetails.address);
  await CheckoutPage.inputCity(addressDetails.city);
  await CheckoutPage.inputZipCode(addressDetails.zipCode);
  await CheckoutPage.inputCountry(addressDetails.country);
  await common.userInteraction.pressEnter();
  await browser.takeScreenshot();
});

When('the user choses delivery type', async function () {
  await CheckoutPage.clickStep5Button();
  await browser.takeScreenshot();
});

When(/^Add any product from "([^"]+)" category(?: filtered by "([^"]+)": "([^"]+)")? to the cart$/, async function (category, filter, filterOption) {
  await HomePage.selectCategory(category);
  
  if (filter && filterOption) {
    await HomePage.clickFilterButton();
    await HomePage.selectFilter(filter);
    await HomePage.selectFilterOption(filterOption);

    await browser.takeScreenshot();

    await HomePage.applyFiltering();

    await browser.takeScreenshot();
  }

  await HomePage.selectFirstProduct();

  this.addCartItem(await HomePage.getSelectedProductDetails());

  await HomePage.clickAddToCartButtonForSelectedProduct();

  await browser.takeScreenshot();

  await HomePage.clickCategoriesBackButton();
});

When(/^Add "([^"]+)" product to the cart(?: with quantity "(\d+)")?$/, async function (productName, quantity) {
  await HomePage.searchForProduct(productName);
  await HomePage.selectFoundProduct();

  await browser.takeScreenshot();

  let product = await HomePage.getSelectedProductDetails();
  
  const productQuantity = parseInt(quantity ?? 1);
  product.quantity = productQuantity;

  this.addCartItem(product);

  for (let i = 0; i < productQuantity ; i++) {
    await HomePage.clickAddToCartButtonForSelectedProduct();  
  }

  await browser.takeScreenshot();

  await HomePage.clickCategoriesBackButton();
  await HomePage.resetSearchField();
});

When('the user reviews the order summary', async function () {
  await CheckoutPage.clickOrderSummaryButton();
  await OrderSummary.waitForPageToLoad();
  await browser.takeScreenshot();
});

Then('the user submits the order', async function () {
  await OrderSummary.clickSubmitButton();
  await browser.takeScreenshot();

  await OrderSummary.clickConfirmationModalYesButton();
});

Then('the order is successfully completed', async function () {
  await OrderCompletedPage.waitForPageToLoad();

  const successMessageText = await OrderCompletedPage.getSuccessMessageText();
  const expectedText = "Thank you for your order!";
  
  await common.assertion.expectToContain(successMessageText, expectedText);
  await browser.takeScreenshot();
});

Then('Verify cart contains exactly added products', async function () {
  await HomePage.clickCartButton();
  const actualCartItems = await HomePage.getCartItems();

  common.assertion.expectEqual(actualCartItems, this.getCartItems(), 'Message');

  await browser.takeScreenshot();
});