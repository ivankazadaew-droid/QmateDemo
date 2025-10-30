class OrderCompleted {

    static PAGE_CONTENT_CONTAINER_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.OrderCompleted",
            "metadata": "sap.m.Page",
            "id": "*orderCompletedPage"
        }
    };

    static SUCCESS_MESSAGE_SELECTOR = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.OrderCompleted",
            "metadata": "sap.m.FormattedText"
        }
    };

    async waitForPageToLoad() {
        await ui5.element.getDisplayed(
            OrderCompleted.PAGE_CONTENT_CONTAINER_SELECTOR,
            0,
            { timeout: 10000}
        );
    }
     
    async getSuccessMessageText() {
        return await ui5.element.getPropertyValue(
            OrderCompleted.SUCCESS_MESSAGE_SELECTOR, 
            "htmlText",
            0,
            { timeout: 30000 }
        );
    }
}

export default new OrderCompleted();