class OrderSummary {

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
     
    async clickSubmitButton() {
        await ui5.userInteraction.click(OrderSummary.SUBMIT_BUTTON_SELECTOR);
    }

    async clickConfirmationModalYesButton() {
        await ui5.userInteraction.click(OrderSummary.CONFIRMATION_MODAL_YES_BUTTON);
    }
}

export default new OrderSummary();
