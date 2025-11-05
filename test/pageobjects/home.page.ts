import BasePage from './base.page.ts';

class HomePage extends BasePage {
  static readonly URL = '/test-resources/sap/m/demokit/cart/webapp/index.html';

  static readonly WELCOME_HEADLINE_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Welcome',
      metadata: 'sap.m.Title',
      text: [
        {
          path: 'i18n>welcomeHeadline',
        },
      ],
    },
  };

  static readonly ADD_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Welcome',
      metadata: 'sap.m.Button',
      bindingContextPath: '/Promoted/0',
    },
  };

  static readonly CART_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Welcome',
      metadata: 'sap.m.ToggleButton',
    },
  };

  static readonly PROCEED_CART_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Cart',
      metadata: 'sap.m.Button',
      id: '*proceedButton',
    },
  };

  static readonly OUT_OF_STOCK_CONFIRMATION_DIALOG = {
    elementProperties: {
      metadata: 'sap.m.Bar',
    },
    ancestorProperties: {
      metadata: 'sap.m.Dialog',
    },
  };

  static readonly CATEGORIES_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Home',
      metadata: 'sap.m.StandardListItem',
    },
  };

  static readonly PRODUCT_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Home',
      metadata: 'sap.m.ObjectListItem',
    },
  };

  static readonly PRODUCT_STATUS_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.ObjectStatus',
    },
  };

  static readonly SEARCH_FIELD_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Home',
      metadata: 'sap.m.SearchField',
      id: '*searchField',
    },
  };

  static readonly FILTER_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.Button',
      id: '*masterListFilterButton',
    },
  };

  private getProductCartButtonSelectorByProductStatus(productStatus: string): object {
    return {
      elementProperties: {
        metadata: 'sap.m.Button',
      },
      ancestorProperties: {
        metadata: 'sap.ui.layout.BlockLayoutCell',
        descendantProperties: {
          metadata: 'sap.m.ObjectStatus',
          text: productStatus,
        },
      },
    };
  }

  private getCategorySelectorByName(categoryName: string): object {
    return {
      elementProperties: {
        viewName: 'sap.ui.demo.cart.view.Home',
        metadata: 'sap.m.StandardListItem',
        title: categoryName,
      },
    };
  }

  private getFilterTypeSelectorByName(filterType: string): object {
    return {
      elementProperties: {
        viewName: 'sap.ui.demo.cart.view.Category',
        metadata: 'sap.m.StandardListItem',
        title: filterType,
      },
    };
  }

  private getFilterOptionSelectorByName(filterOption: string): object {
    return {
      elementProperties: {
        viewName: 'sap.ui.demo.cart.view.Category',
        metadata: 'sap.m.CheckBox',
      },
      ancestorProperties: {
        viewName: 'sap.ui.demo.cart.view.Category',
        metadata: 'sap.m.StandardListItem',
        title: filterOption,
      },
    };
  }

  async open(): Promise<void> {
    await browser.url(HomePage.URL);
  }

  async waitForPageToLoad(): Promise<void> {
    await ui5.element.getDisplayed(HomePage.WELCOME_HEADLINE_SELECTOR, 0, 10000);
  }

  async clickAddItemButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.ADD_BUTTON_SELECTOR);
  }

  async clickCartButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.CART_BUTTON_SELECTOR);
  }

  async clickProceedCartButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.PROCEED_CART_BUTTON_SELECTOR);
  }

  async clickAddToCartButtonForProductWithStatus(status: string): Promise<void> {
    await ui5.userInteraction.click(this.getProductCartButtonSelectorByProductStatus(status));
  }

  async isOutOfStockConfirmationDialogDisplayed(): Promise<boolean> {
    return (await ui5.element.getPropertyValue(
      HomePage.OUT_OF_STOCK_CONFIRMATION_DIALOG,
      'visible',
      0,
      10000,
    )) as Promise<boolean>;
  }

  async getAllCategoryTitles(): Promise<string[]> {
    const elements = await ui5.element.getAllDisplayed(HomePage.CATEGORIES_LIST_SELECTOR);

    return Promise.all(
      elements.map(async (el) => {
        const title = await ui5.control.getProperty<string>(el, 'title');
        return title || '';
      }),
    );
  }

  async getAllProductTitles(): Promise<string[]> {
    const elements = await ui5.element.getAllDisplayed(HomePage.PRODUCT_LIST_SELECTOR);

    return Promise.all(
      elements.map(async (el) => {
        const title = await ui5.control.getProperty<string>(el, 'title');
        return title || '';
      }),
    );
  }

  async getAllProductStatuses(): Promise<string[]> {
    const elements = await ui5.element.getAllDisplayed(HomePage.PRODUCT_STATUS_SELECTOR);

    return Promise.all(
      elements.map(async (el) => {
        const title = await ui5.control.getProperty<string>(el, 'text');
        return title || '';
      }),
    );
  }

  async searchForProduct(productName: string): Promise<void> {
    await ui5.userInteraction.searchFor(HomePage.SEARCH_FIELD_SELECTOR, productName);
  }

  async selectCategory(categoryName: string): Promise<void> {
    await ui5.userInteraction.click(this.getCategorySelectorByName(categoryName));
  }

  async clickFilterButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.FILTER_BUTTON_SELECTOR);
  }

  async selectFilter(filterName: string): Promise<void> {
    await ui5.userInteraction.clickListItem(this.getFilterTypeSelectorByName(filterName));
  }

  async selectFilterOption(filterOptionName: string): Promise<void> {
    await ui5.userInteraction.check(this.getFilterOptionSelectorByName(filterOptionName));
  }

  async applyFiltering(): Promise<void> {
    await ui5.confirmationDialog.clickOk();
  }
}

export default new HomePage();
