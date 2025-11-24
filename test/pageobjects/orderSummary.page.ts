import BasePage from './base.page.ts';

class OrderSummary extends BasePage {
  private static readonly ITEMS_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.ObjectListItem',
    },
    ancestorProperties: {
      metadata: 'sap.m.List',
      viewName: 'sap.ui.demo.cart.view.Checkout',
      id: '*summaryEntryList',
    },
  };

  private static readonly SUBMIT_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Button',
      id: '*submitOrder',
    },
  };

  async waitForPageToLoad(): Promise<void> {
    await ui5.element.getDisplayed(OrderSummary.ITEMS_LIST_SELECTOR, 0, 10000);
  }

  async clickSubmitButton(): Promise<void> {
    await ui5.userInteraction.click(OrderSummary.SUBMIT_BUTTON_SELECTOR);
  }

  async clickConfirmationModalYesButton(): Promise<void> {
    await ui5.confirmationDialog.clickYes();
  }
}

export default new OrderSummary();
