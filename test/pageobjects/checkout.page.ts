class CheckoutPage {

    static ITEMS_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.WizardStep",
            "id": "*contentsStep"
        }
    }

    static STEP_2_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*contentsStep-nextButton"
        }
    };

    static STEP_3_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*paymentTypeStep-nextButton"
        }
    };

    static STEP_4_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*creditCardStep-nextButton"
        }
    };

    static STEP_5_BUTTON_SELECTOR = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*invoiceStep-nextButton"
            }
        };

    static CARD_HOLDER_NAME_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*creditCardHolderName"
        }
    };

    static CARD_NUMBER_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.MaskInput",
            "id": "*creditCardNumber"
        }
    };

    static SECURITY_CODE_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.MaskInput",
            "id": "*creditCardSecurityNumber"
        }
    };

    static EXPIRATION_DATE_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.DatePicker",
            "id": "*creditCardExpirationDate"
        }
    };

    static ADDRESS_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressAddress"
        }
    };

    static CITY_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressCity"
        }
    };

    static ZIP_CODE_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressZip"
        }
    };

    static COUNTRY_INPUT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressCountry"
        }
    };

    static ORDER_SUMMARY_BUTTON_SLECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*deliveryTypeStep-nextButton"
        }
    };

    async waitForPageToLoad() {
        await ui5.element.getDisplayed(
            CheckoutPage.ITEMS_LIST_SELECTOR,
            0,
            10000
        );
    }
     
    async clickStep2Button() {
        await ui5.userInteraction.click(CheckoutPage.STEP_2_BUTTON_SELECTOR);
    }

    async clickStep3Button() {
        await ui5.userInteraction.click(CheckoutPage.STEP_3_BUTTON_SELECTOR);
    }

    async clickStep4Button() {
        await ui5.userInteraction.click(CheckoutPage.STEP_4_BUTTON_SELECTOR);
    }

    async clickStep5Button() {
        await ui5.userInteraction.click(CheckoutPage.STEP_5_BUTTON_SELECTOR);
    }

    async inputCardHolderName(name: string) {
        await ui5.userInteraction.fill(CheckoutPage.CARD_HOLDER_NAME_INPUT_SELECTOR, name);
    }

    async inputCardNumber(number: string) {
        await ui5.userInteraction.clearAndFill(CheckoutPage.CARD_NUMBER_INPUT_SELECTOR, number);
    }

    async inputSecurityCode(code: string) {
        await ui5.userInteraction.clearAndFill(CheckoutPage.SECURITY_CODE_INPUT_SELECTOR, code);
    } 

    async inputExpirationDate(date: string) {
        await ui5.userInteraction.clearAndFill(CheckoutPage.EXPIRATION_DATE_INPUT_SELECTOR, date);
    }

    async inputAddress(address: string) {
        await ui5.userInteraction.fill(CheckoutPage.ADDRESS_INPUT_SELECTOR, address);
    }

    async inputCity(city: string) {
        await ui5.userInteraction.fill(CheckoutPage.CITY_INPUT_SELECTOR, city);
    }

    async inputZipCode(zipCode: string) {
        await ui5.userInteraction.fill(CheckoutPage.ZIP_CODE_INPUT_SELECTOR, zipCode);
    }

    async inputCountry(country: string) {
        await ui5.userInteraction.fill(CheckoutPage.COUNTRY_INPUT_SELECTOR, country);
    }

    async clickOrderSummaryButton() {
        await ui5.userInteraction.click(CheckoutPage.ORDER_SUMMARY_BUTTON_SLECTOR);
    }
}

export default new CheckoutPage();