class OrderSummary extends BasePage {

    static ITEMS_LIST_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.ObjectListItem"
        },
        "ancestorProperties": {
            "metadata": "sap.m.List",
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "id": "*summaryEntryList"
        }
    };

    static SUBMIT_BUTTON_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*submitOrder"
        }
    };

    static CONFIRMATION_MODAL_YES_BUTTON = {
        "elementProperties": {
            "metadata": "sap.m.Button",
            "text": "Yes"
        }
    };

    async waitForPageToLoad() {
        await ui5.element.getDisplayed(
            OrderSummary.ITEMS_LIST_SELECTOR,
            0,
            10000
        );
    }
     
    async clickSubmitButton() {
        await ui5.userInteraction.click(OrderSummary.SUBMIT_BUTTON_SELECTOR);
    }

    async clickConfirmationModalYesButton() {
        await ui5.confirmationDialog.clickYes();
    }
}

export default new OrderSummary();