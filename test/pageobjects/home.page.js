class HomePage {

    static WELCOME_HEADLINE_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.Title",
            "text": [
                {
                    "path": "i18n>welcomeHeadline"
                }
            ]
        }
    };

    static ADD_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.Button",
            "bindingContextPath": "/Promoted/0"
        }
    };

    static CART_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.ToggleButton"
        }
    };

    static PROCEED_CART_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Cart",
            "metadata": "sap.m.Button",
            "id": "*proceedButton"
        }
    };

    static OUT_OF_STOCK_CONFIRMATION_DIALOG = {
        "elementProperties": {
            "metadata": "sap.m.Bar"
        },
        "ancestorProperties": {
            "metadata": "sap.m.Dialog"
        }
    }

    getProductCartButtonSelectorByProductStatus(productStatus) {
        return {
            "elementProperties": {
                "metadata": "sap.m.Button"
            },
            "ancestorProperties": {
                "metadata": "sap.ui.layout.BlockLayoutCell",
                "descendantProperties": {
                "metadata": "sap.m.ObjectStatus",
                    "text": productStatus 
                }
            }
        }
    }

    async open() {
        await browser.url("/test-resources/sap/m/demokit/cart/webapp/index.html");
    }

    async waitForPageToLoad() {
        await ui5.element.getDisplayed(
            HomePage.WELCOME_HEADLINE_SELECTOR,
            0,
            { timeout: 10000}
        );
    }
     
    async clickAddItemButton() {
        await ui5.userInteraction.click(HomePage.ADD_BUTTON_SELECTOR);
    }

    async clickCartButton() {
        await ui5.userInteraction.click(HomePage.CART_BUTTON_SELECTOR);
    }

    async clickProceedCartButton() {
        await ui5.userInteraction.click(HomePage.PROCEED_CART_BUTTON_SELECTOR);
    }

    async clickAddToCartButtonForProductWithStatus(status) {
        await ui5.userInteraction.click(this.getProductCartButtonSelectorByProductStatus(status));
    }

    async isOutOfStockConfirmationDialogDisplayed() {
        return await ui5.element.getPropertyValue(
            HomePage.OUT_OF_STOCK_CONFIRMATION_DIALOG, 
            "visible",
            0,
            { timeout: 10000 }
        );
    }
}

export default new HomePage();