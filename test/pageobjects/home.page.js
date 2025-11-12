class HomePage {

    static WELCOME_HEADLINE_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.Title",
            "text": [
                {
                    "path": "i18n>welcomeHeadline",
                }
            ]
        }
    };

    static ADD_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.Button",
            "bindingContextPath": "/Promoted/0",
        }
    };

    static CART_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.ToggleButton",
        }
    };

    static PROCEED_CART_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Cart",
            "metadata": "sap.m.Button",
            "id": "*proceedButton",
        }
    };

    static OUT_OF_STOCK_CONFIRMATION_DIALOG = {
        "elementProperties": {
            "metadata": "sap.m.Bar",
        },
        "ancestorProperties": {
            "metadata": "sap.m.Dialog",
        }
    }

    static SEARCH_FIELD_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.m.SearchField",
            "id": "*searchField",
        }    
    };

    static FILTER_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Category",
            "metadata": "sap.m.Button",
            "id": "*masterListFilterButton",
        }
    };

    static PRODUCT_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": 'sap.ui.demo.cart.view.Category',
            "metadata": 'sap.m.ObjectListItem',
        },
    };

    static PRODUCT_VIEW_ADD_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": 'sap.ui.demo.cart.view.Product',
            "metadata": 'sap.m.Button',
            "text": [
                {
                    "path": 'i18n>addToCartShort',
                },
            ],
        },
    };

    static SELECTED_PRODUCT_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Product",
            "metadata": "sap.m.ObjectHeader",
        }
    }

    static CATEGORIES_BACK_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": 'sap.ui.demo.cart.view.Category',
            "metadata": 'sap.m.Button',
            "id": '*page-navButton',
        },
    };

    static FOUND_PRODUCTS_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": 'sap.ui.demo.cart.view.Home',
            "metadata": 'sap.m.ObjectListItem',
        },
    };

    static CART_ITEM_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": 'sap.ui.demo.cart.view.Cart',
            "metadata": 'sap.m.ObjectListItem',
        },
    };

    static PRODUCT_VIEW_CART_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": 'sap.ui.demo.cart.view.Product',
            "metadata": 'sap.m.ToggleButton',
        },
    };

    _getFilterTypeSelectorByName(filterType) {
        return {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Category",
                "metadata": "sap.m.StandardListItem",
                "title": `${filterType}`,
            }
        }
    };

    _getFilterOptionSelectorByName(filterOption) {
        return {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Category",
                "metadata": "sap.m.CheckBox"
            },
            "ancestorProperties": {
                "viewName": "sap.ui.demo.cart.view.Category",
                "metadata": "sap.m.StandardListItem",
                "title": filterOption,
            }
        }
    };

    _getProductCartButtonSelectorByProductStatus(productStatus) {
        return {
            "elementProperties": {
                "metadata": "sap.m.Button"
            },
            "ancestorProperties": {
                "metadata": "sap.ui.layout.BlockLayoutCell",
                "descendantProperties": {
                "metadata": "sap.m.ObjectStatus",
                    "text": productStatus,
                }
            }
        }
    }

    _getCategorySelectorByName(categoryName) {
        return {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Home",
                "metadata": "sap.m.StandardListItem",
                "title": categoryName,
            }
        }
    };

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

    async selectCategory(categoryName) {
        await ui5.userInteraction.click(this._getCategorySelectorByName(categoryName));
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
        await ui5.userInteraction.click(this._getProductCartButtonSelectorByProductStatus(status));
    }

    async isOutOfStockConfirmationDialogDisplayed() {
        return await ui5.element.getPropertyValue(
            HomePage.OUT_OF_STOCK_CONFIRMATION_DIALOG, 
            "visible",
            0,
            { timeout: 10000 }
        );
    }

    async searchForProduct(productName) {
        await ui5.userInteraction.searchFor(HomePage.SEARCH_FIELD_SELECTOR, productName, 0, 5000, false);
    }

    async selectCategory(categoryName) {
        await ui5.userInteraction.click(this._getCategorySelectorByName(categoryName));
    }

    async clickFilterButton() {
        await ui5.userInteraction.click(HomePage.FILTER_BUTTON_SELECTOR);
    }

    async selectFilter(filterName) {
        await ui5.userInteraction.clickListItem(this._getFilterTypeSelectorByName(filterName));
    }

    async selectFilterOption(filterOptionName) {
        await ui5.userInteraction.check(this._getFilterOptionSelectorByName(filterOptionName));
    }

    async applyFiltering() {
        await ui5.confirmationDialog.clickOk();
    }

    async selectFirstProduct() {
        await ui5.userInteraction.click(HomePage.PRODUCT_LIST_SELECTOR, 0);
    }

    async selectFoundProduct() {
        await ui5.userInteraction.click(HomePage.FOUND_PRODUCTS_LIST_SELECTOR, 0);
    }

    async clickAddToCartButtonForSelectedProduct() {
        await ui5.userInteraction.click(HomePage.PRODUCT_VIEW_ADD_BUTTON_SELECTOR);
    }

    async clickCategoriesBackButton() {
        await ui5.userInteraction.click(HomePage.CATEGORIES_BACK_BUTTON_SELECTOR);
    }

    async getCartItems() {
        let cartItems = [];

        const elements = await ui5.element.getAllDisplayed(HomePage.CART_ITEM_LIST_SELECTOR);

        for (const element of elements) {
            const name = await ui5.control.getProperty(element, "title");
            const quantity = parseInt(await ui5.control.getProperty(element, "intro"));
            const price = await ui5.control.getProperty(element, "number");
            const currency = await ui5.control.getProperty(element, "numberUnit");

            const cartItem = {
                name: name,
                quantity: quantity,
                price: price + currency,
            };

            cartItems.push(cartItem);
        }

        return cartItems;
    }

    async getSelectedProductDetails() {
        const element = await ui5.element.getDisplayed(HomePage.SELECTED_PRODUCT_SELECTOR);

        return {
            name: await ui5.control.getProperty(element, "title"),
            quantity: 1,
            price: await ui5.control.getProperty(element, "number")+
                await ui5.control.getProperty(element, "numberUnit"),
        }
    }

    async clickProductViewCartButton() {
    await ui5.userInteraction.click(HomePage.PRODUCT_VIEW_CART_BUTTON_SELECTOR);
  }
}

export default new HomePage();
