class OrderCompleted {

    static SUCCESS_MESSAGE_SELECTOR = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.OrderCompleted",
                "metadata": "sap.m.FormattedText"
            }
        };
     
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
