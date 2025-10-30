import { faker } from '@faker-js/faker';
import allure from '@wdio/allure-reporter';
import { takeScreenshotAndAttach } from '../utils/allure.utils.js'

import HomePage from '../pageobjects/home.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import OrderSummary from '../pageobjects/orderSummary.page.js';
import OrderCompletedPage from '../pageobjects/orderCompleted.page.js';

describe('Home Page tests', () => {

    it.skip('Add any item', async () => {

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

        // Add item

        await HomePage.clickAddItemButton();
        await HomePage.clickCartButton();
        await HomePage.clickProceedCartButton();

        // Checkout

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

        await OrderSummary.clickSubmitButton();
        await OrderSummary.clickConfirmationModalYesButton();

        // Assertion

        const successMessageText = await OrderCompletedPage.getSuccessMessageText();
        const expectedText = "Thank you for your!";

        await common.assertion.expectToContain(successMessageText, expectedText);
    });

    it('Verify Confirmation modal is displayed when Out of Stoke product is selected', async () => {

        await allure.step('Add Out of Stock product to Cart', async () => {
            await HomePage.clickAddToCartButtonForProductWithStatus("Out of Stock");

            const isModalDisplayed = await HomePage.isOutOfStockConfirmationDialogDisplayed()

            await common.assertion.expectTrue(isModalDisplayed);

            await takeScreenshotAndAttach();
        });
    });
});