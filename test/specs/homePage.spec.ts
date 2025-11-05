/// <reference types="mocha" />

import { faker } from '@faker-js/faker';
import allure from '@wdio/allure-reporter';
import { takeScreenshotAndAttach } from '../utils/allure.utils.ts';

import HomePage from '../pageobjects/home.page.ts';
import CheckoutPage from '../pageobjects/checkout.page.ts';
import OrderSummary from '../pageobjects/orderSummary.page.ts';
import OrderCompletedPage from '../pageobjects/orderCompleted.page.ts';

import { ProductCategory } from '../enums/productCategory.enum.ts';
import { ProductFilter } from '../enums/productFilter.enum.ts';
import { ProductStatus } from '../enums/productStatus.enum.ts';

describe('Home Page tests', () => {
  it('Add any item', async () => {
    const cardHolderName: string = faker.person.fullName();
    const rawCardNumber: string = faker.finance.creditCardNumber();
    const cardNumber: string = rawCardNumber.replace(/\D/g, '').substring(0, 16);
    const securityCode: string = faker.finance.creditCardCVV();
    const futureMonth: number = faker.date.future({ years: 5 }).getMonth() + 1;
    const futureYear: number = faker.date.future({ years: 5 }).getFullYear();
    const expirationDate: string = `${futureMonth.toString().padStart(2, '0')}/${futureYear}`;
    const streetName: string = faker.location.street();
    const houseNumber: string = faker.string.numeric(1);
    const address: string = `${streetName.split(' ')[0]} ${houseNumber}`;
    const city: string = faker.location.city();
    const zipCode: string = faker.location.zipCode('#####');
    const country: string = faker.location.country();

    await HomePage.open();
    await HomePage.waitForPageToLoad();

    await HomePage.clickAddItemButton();
    await HomePage.clickCartButton();
    await HomePage.clickProceedCartButton();

    await CheckoutPage.waitForPageToLoad();
    await CheckoutPage.clickStep2Button();
    await CheckoutPage.clickStep3Button();

    await CheckoutPage.inputCardHolderName(cardHolderName);
    await CheckoutPage.inputCardNumber(cardNumber);
    await CheckoutPage.inputSecurityCode(securityCode);
    await CheckoutPage.inputExpirationDate(expirationDate);

    await common.userInteraction.pressEnter();

    await CheckoutPage.clickStep4Button();
    await CheckoutPage.inputAddress(address);
    await CheckoutPage.inputCity(city);
    await CheckoutPage.inputZipCode(zipCode);
    await CheckoutPage.inputCountry(country);

    await common.userInteraction.pressEnter();

    await CheckoutPage.clickStep5Button();
    await CheckoutPage.clickOrderSummaryButton();

    await OrderSummary.waitForPageToLoad();
    await OrderSummary.clickSubmitButton();
    await OrderSummary.clickConfirmationModalYesButton();

    await OrderCompletedPage.waitForPageToLoad();

    const successMessageText: string = await OrderCompletedPage.getSuccessMessageText();
    const expectedText: string = 'Thank you for your order!';

    await common.assertion.expectToContain(successMessageText, expectedText);
  });

  it('Verify Confirmation modal is displayed when Out of Stoke product is selected', async () => {
    await allure.step('Add Out of Stock product to Cart', async () => {
      await HomePage.open();
      await HomePage.waitForPageToLoad();
      await HomePage.clickAddToCartButtonForProductWithStatus(ProductStatus.OUT_OF_STOCK);

      const isModalDisplayed: boolean = await HomePage.isOutOfStockConfirmationDialogDisplayed();

      await common.assertion.expectTrue(isModalDisplayed);

      await takeScreenshotAndAttach();
    });
  });

  it('Verify categories list is equal expected', async () => {
    await HomePage.open();
    await HomePage.waitForPageToLoad();

    const expectedCategories: string[] = [
      'Accessories',
      'Computer System Accessories',
      'Desktop Computers',
      'Flat Screen TVs',
      'Flat Screens',
      'Graphics Card',
      'Keyboards',
      'Laptops',
      'Mice',
      'Printers',
      'Scanners',
      'Servers',
      'Smartphones and Tablets',
      'Software',
      'Speakers',
      'Telecommunication',
    ];

    const actualCategories: string[] = await HomePage.getAllCategoryTitles();

    await common.assertion.expectEqual(actualCategories, expectedCategories);
  });

  it('Verify product can be found via search bar', async () => {
    await HomePage.open();
    await HomePage.waitForPageToLoad();

    await HomePage.searchForProduct('Screen clean');

    const actualProducts: string[] = await HomePage.getAllProductTitles();

    await common.assertion.expectEqual(actualProducts.length, 1);
    await common.assertion.expectEqual(actualProducts[0], 'Screen clean');
  });

  it('Verify products can be filtered by availability', async () => {
    await HomePage.open();
    await HomePage.waitForPageToLoad();

    await HomePage.selectCategory(ProductCategory.ACCESSORIES);
    await HomePage.clickFilterButton();
    await HomePage.selectFilter(ProductFilter.AVAILABILITY);
    await HomePage.selectFilterOption(ProductStatus.AVAILABLE);
    await HomePage.applyFiltering();

    const actualStatusesSet: Set<string> = new Set<string>(await HomePage.getAllProductStatuses());

    await common.assertion.expectEqual(actualStatusesSet.size, 1);
    await common.assertion.expectTrue(actualStatusesSet.has(ProductStatus.AVAILABLE));
  });
});
