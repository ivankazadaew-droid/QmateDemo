/// <reference types="mocha" />

import allure from '@wdio/allure-reporter';
import { takeScreenshotAndAttach } from '../utils/allure.utils.ts';
import testDataGenerator from '../data/testDataGenerator.ts';

import HomePage from '../pageobjects/home.page.ts';
import CheckoutPage from '../pageobjects/checkout.page.ts';
import OrderSummary from '../pageobjects/orderSummary.page.ts';
import OrderCompletedPage from '../pageobjects/orderCompleted.page.ts';

import { ProductCategory } from '../enums/productCategory.enum.ts';
import { ProductFilter } from '../enums/productFilter.enum.ts';
import { ProductStatus } from '../enums/productStatus.enum.ts';
import { ProductSuplier } from '../enums/productSuplier.enum.ts';

describe('Home Page tests', () => {
  it('Add any item', async () => {
    const cardDetails = testDataGenerator.generateCardDetails();
    const addressDetails = testDataGenerator.generateAddressDetails();

    await HomePage.open();
    await HomePage.waitForPageToLoad();

    await HomePage.clickAddItemButton();
    await HomePage.clickCartButton();
    await HomePage.clickProceedCartButton();

    await CheckoutPage.waitForPageToLoad();
    await CheckoutPage.clickStep2Button();
    await CheckoutPage.clickStep3Button();

    await CheckoutPage.inputCardHolderName(cardDetails.cardHolderName);
    await CheckoutPage.inputCardNumber(cardDetails.cardNumber);
    await CheckoutPage.inputSecurityCode(cardDetails.securityCode);
    await CheckoutPage.inputExpirationDate(cardDetails.expirationDate);

    await common.userInteraction.pressEnter();

    await CheckoutPage.clickStep4Button();
    await CheckoutPage.inputAddress(addressDetails.address);
    await CheckoutPage.inputCity(addressDetails.city);
    await CheckoutPage.inputZipCode(addressDetails.zipCode);
    await CheckoutPage.inputCountry(addressDetails.country);

    await common.userInteraction.pressEnter();

    await CheckoutPage.clickStep5Button();
    await CheckoutPage.clickOrderSummaryButton();

    await OrderSummary.waitForPageToLoad();
    await OrderSummary.clickSubmitButton();
    await OrderSummary.clickConfirmationModalYesButton();

    await OrderCompletedPage.waitForPageToLoad();

    const successMessageText: string = await OrderCompletedPage.getSuccessMessageText();
    const expectedText: string = 'Thank you for your order!';

    common.assertion.expectToContain(successMessageText, expectedText);
  });

  it('Verify Confirmation modal is displayed when Out of Stoke product is selected', async () => {
    await allure.step('Add Out of Stock product to Cart', async () => {
      await HomePage.open();
      await HomePage.waitForPageToLoad();
      await HomePage.clickAddToCartButtonForProductWithStatus(ProductStatus.OUT_OF_STOCK);

      const isModalDisplayed: boolean = await HomePage.isOutOfStockConfirmationDialogDisplayed();

      common.assertion.expectTrue(isModalDisplayed);

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

    common.assertion.expectEqual(actualCategories, expectedCategories);
  });

  it('Verify product can be found via search bar', async () => {
    await HomePage.open();
    await HomePage.waitForPageToLoad();

    await HomePage.searchForProduct('Screen clean');

    const actualProducts: string[] = await HomePage.getAllFoundProductTitles();

    common.assertion.expectEqual(actualProducts.length, 1);
    common.assertion.expectEqual(actualProducts[0], 'Screen clean');
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

    common.assertion.expectEqual(actualStatusesSet.size, 1);
    common.assertion.expectTrue(actualStatusesSet.has(ProductStatus.AVAILABLE));
  });

  it('Verify cart contains added products', async () => {
    let expectedCartItems: string[] = [];

    await HomePage.open();
    await HomePage.waitForPageToLoad();
    await HomePage.selectCategory(ProductCategory.ACCESSORIES);
    await HomePage.clickFilterButton();
    await HomePage.selectFilter(ProductFilter.AVAILABILITY);
    await HomePage.selectFilterOption(ProductStatus.AVAILABLE);
    await HomePage.applyFiltering();
    await HomePage.selectFirstProduct();
    await HomePage.clickAddToCartButtonForSelectedProduct();
    expectedCartItems.push(await HomePage.getProductViewProductName());

    await HomePage.clickCategoriesBackButton();
    await HomePage.selectCategory(ProductCategory.LAPTOPS);
    await HomePage.clickFilterButton();
    await HomePage.resetFilters();
    await HomePage.selectFilter(ProductFilter.SUPLIER);
    await HomePage.selectFilterOption(ProductSuplier.ULTRASONIC_UNITED);
    await HomePage.applyFiltering();
    await HomePage.selectFirstProduct();
    await HomePage.clickAddToCartButtonForSelectedProduct();
    expectedCartItems.push(await HomePage.getProductViewProductName());

    await HomePage.clickProductViewCartButton();

    const actualCartItems: string[] = await HomePage.getCartItems();

    common.assertion.expectEqual(actualCartItems, expectedCartItems);
  });
});
