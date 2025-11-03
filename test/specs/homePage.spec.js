import { faker } from '@faker-js/faker';
import allure from '@wdio/allure-reporter';
import { takeScreenshotAndAttach } from '../utils/allure.utils.js'

import HomePage from '../pageobjects/home.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import OrderSummary from '../pageobjects/orderSummary.page.js';
import OrderCompletedPage from '../pageobjects/orderCompleted.page.js';

describe('Home Page tests', () => {

    it('Add any item', async () => {

        const cardHolderName = faker.person.fullName();
        let rawCardNumber = faker.finance.creditCardNumber(); 
        const cardNumber = rawCardNumber.replace(/\D/g, '').substring(0, 16);
        const securityCode = faker.finance.creditCardCVV(); 
        const futureMonth = faker.date.future({ years: 5 }).getMonth() + 1;
        const futureYear = faker.date.future({ years: 5 }).getFullYear();
        const expirationDate = `${futureMonth.toString().padStart(2, '0')}/${futureYear}`; 
        const streetName = faker.location.street(); 
        const houseNumber = faker.string.numeric(1);
        const address = `${streetName.split(' ')[0]} ${houseNumber}`;
        const city = faker.location.city();
        const zipCode = faker.location.zipCode('#####');
        const country = faker.location.country();

        await HomePage.open();
        await HomePage.waitForPageToLoad();

        // Add item

        await HomePage.clickAddItemButton();
        await HomePage.clickCartButton();
        await HomePage.clickProceedCartButton();

        // Checkout

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

        // Assertion

        await OrderCompletedPage.waitForPageToLoad();

        const successMessageText = await OrderCompletedPage.getSuccessMessageText();
        const expectedText = "Thank you for your order!";

        await common.assertion.expectToContain(successMessageText, expectedText);
    });

    it('Verify Confirmation modal is displayed when Out of Stoke product is selected', async () => {

        await allure.step('Add Out of Stock product to Cart', async () => {
            await HomePage.open();
            await HomePage.waitForPageToLoad();
            await HomePage.clickAddToCartButtonForProductWithStatus("Out of Stock");

            const isModalDisplayed = await HomePage.isOutOfStockConfirmationDialogDisplayed()

            await common.assertion.expectTrue(isModalDisplayed);

            await takeScreenshotAndAttach();
        });
    });

    it('Verify categories list is equal expected', async () => {
        await HomePage.open();
        await HomePage.waitForPageToLoad();

        const expectedCategories = [
            "Accessories",
            "Computer System Accessories",
            "Desktop Computers",
            "Flat Screen TVs",
            "Flat Screens",
            "Graphics Card",
            "Keyboards",
            "Laptops",
            "Mice",
            "Printers",
            "Scanners",
            "Servers",
            "Smartphones and Tablets",
            "Software",
            "Speakers",
            "Telecommunication",
        ];

        const actualCategories = await HomePage.getAllCategoryTitles();

        await common.assertion.expectEqual(actualCategories, expectedCategories); 
    });

    it.skip('Verify product can be found via search bar', async () => {
        await HomePage.open();
        await HomePage.waitForPageToLoad();
        
        await HomePage.searchForProduct("Screen clean");
        
        const actualProducts = await HomePage.getAllProductTitles();

        await common.assertion.expectEqual(actualProducts.length, 1);
        await common.assertion.expectEqual(actualProducts[0], "Screen clean");
    });

    it('Verify products can be filtered by availability', async () => {
        await HomePage.open();
        await HomePage.waitForPageToLoad();
        
        await HomePage.selectCategory("Accessories");
        await HomePage.clickFilterButton();
        await HomePage.selectFilter("Availability");
        await HomePage.selectFilterOption("Available");
        await HomePage.applyFiltering();

        let actualStatusesSet = new Set(await HomePage.getAllProductStatuses());

        await common.assertion.expectEqual(actualStatusesSet.size, 1);
        await common.assertion.expectTrue(actualStatusesSet.has("Available"));
    });
});