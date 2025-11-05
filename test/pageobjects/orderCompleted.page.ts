import BasePage from './base.page.ts';

class OrderCompleted extends BasePage {
  static readonly PAGE_CONTENT_CONTAINER_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.OrderCompleted',
      metadata: 'sap.m.Page',
      id: '*orderCompletedPage',
    },
  };

  static readonly SUCCESS_MESSAGE_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.OrderCompleted',
      metadata: 'sap.m.FormattedText',
    },
  };

  async waitForPageToLoad(): Promise<void> {
    await ui5.element.getDisplayed(OrderCompleted.PAGE_CONTENT_CONTAINER_SELECTOR, 0, 10000);
  }

  async getSuccessMessageText(): Promise<string> {
    return (await ui5.element.getPropertyValue(
      OrderCompleted.SUCCESS_MESSAGE_SELECTOR,
      'htmlText',
      0,
      10000,
    )) as Promise<string>;
  }
}

export default new OrderCompleted();
