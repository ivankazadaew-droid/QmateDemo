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
    };

    static CATEGORIES_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.m.StandardListItem"
        }
    };

    static PRODUCT_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Category",
            "metadata": "sap.m.ObjectListItem"
        }
    };

    static PRODUCT_STATUS_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Category",
            "metadata": "sap.m.ObjectStatus",
        }
    };

    static SEARCH_FIELD_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.m.SearchField",
            "id": "*searchField"
        }    
    };

    static FILTER_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Category",
            "metadata": "sap.m.Button",
            "id": "*masterListFilterButton"
        }
    };

    _getProductCartButtonSelectorByProductStatus(productStatus: string) {
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
    };

    _getCategorySelectorByName(categoryName: string) {
        return {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Home",
                "metadata": "sap.m.StandardListItem",
                "title": categoryName
            }
        }
    };

    _getFilterTypeSelectorByName(filterType: string) {
        return {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Category",
                "metadata": "sap.m.StandardListItem",
                "title": `${filterType}`
            }
        }
    };

    _getFilterOptionSelectorByName(filterOption: string) {
        return {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Category",
                "metadata": "sap.m.CheckBox"
            },
            "ancestorProperties": {
                "viewName": "sap.ui.demo.cart.view.Category",
                "metadata": "sap.m.StandardListItem",
                "title": filterOption
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
            10000
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

    async clickAddToCartButtonForProductWithStatus(status: string) {
        await ui5.userInteraction.click(this._getProductCartButtonSelectorByProductStatus(status));
    }

    async isOutOfStockConfirmationDialogDisplayed() {
        return await ui5.element.getPropertyValue(
            HomePage.OUT_OF_STOCK_CONFIRMATION_DIALOG, 
            "visible",
            0,
            10000
        );
    }

    async getAllCategoryTitles() {
        let categoriesElements = await ui5.element.getAllDisplayed(
            HomePage.CATEGORIES_LIST_SELECTOR
        ) as unknown as Element[];

        let titlePromises = categoriesElements.map((element) => { 
            return ui5.control.getProperty(element as unknown as WebdriverIO.Element, "title"); 
        });
        
        return await Promise.all(titlePromises); 
    }

    async getAllProductTitles() {
        let productElements = await ui5.element.getAllDisplayed(
            HomePage.PRODUCT_LIST_SELECTOR
        ) as unknown as Element[];
        let titlePromises = productElements.map(async(element) => {
            return ui5.control.getProperty(element as unknown as WebdriverIO.Element, "title");
        });
        return await Promise.all(titlePromises);
    }

    async getAllProductStatuses() {
        let statusElements = await ui5.element.getAllDisplayed(
            HomePage.PRODUCT_STATUS_SELECTOR
        ) as unknown as Element[];
        let statusPromises = statusElements.map(async(element) => {
            return ui5.control.getProperty(element as unknown as WebdriverIO.Element, "text");
        });
        return await Promise.all(statusPromises);
    }

    async searchForProduct(productName: string) {
        await ui5.userInteraction.searchFor(HomePage.SEARCH_FIELD_SELECTOR, productName);
    }

    async selectCategory(categoryName: string) {
        await ui5.userInteraction.click(this._getCategorySelectorByName(categoryName));
    }

    async clickFilterButton() {
        await ui5.userInteraction.click(HomePage.FILTER_BUTTON_SELECTOR);
    }

    async selectFilter(filterName: string) {
        await ui5.userInteraction.clickListItem(this._getFilterTypeSelectorByName(filterName));
    }

    async selectFilterOption(filterOptionName: string) {
        await ui5.userInteraction.check(this._getFilterOptionSelectorByName(filterOptionName));
    }

    async applyFiltering() {
        await ui5.confirmationDialog.clickOk();
    }
}

export default new HomePage();