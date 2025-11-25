import { QmateSelector } from 'wdio-qmate-service/modules/ui5/types/ui5.types';
import { ProductCategory } from '../enums/productCategory.enum.ts';
import BasePage from './base.page.ts';

class HomePage extends BasePage {
  private static readonly URL = '/test-resources/sap/m/demokit/cart/webapp/index.html';

  private static readonly WELCOME_HEADLINE_SELECTOR = {
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

  private static readonly WELCOME_VIEW_ADD_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Welcome',
      metadata: 'sap.m.Button',
      bindingContextPath: '/Promoted/0',
    },
  };

  private static readonly PRODUCT_VIEW_ADD_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Product',
      metadata: 'sap.m.Button',
      text: [
        {
          path: 'i18n>addToCartShort',
        },
      ],
    },
  };

  private static readonly PRODUCT_VIEW_HEADER_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Product',
      metadata: 'sap.m.ObjectHeader',
    },
  };

  private static readonly CART_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Welcome',
      metadata: 'sap.m.ToggleButton',
    },
  };

  private static readonly PRODUCT_VIEW_CART_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Product',
      metadata: 'sap.m.ToggleButton',
    },
  };

  private static readonly PROCEED_CART_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Cart',
      metadata: 'sap.m.Button',
      id: '*proceedButton',
    },
  };

  private static readonly OUT_OF_STOCK_CONFIRMATION_DIALOG = {
    elementProperties: {
      metadata: 'sap.m.Bar',
    },
    ancestorProperties: {
      metadata: 'sap.m.Dialog',
    },
  };

  private static readonly CATEGORIES_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Home',
      metadata: 'sap.m.StandardListItem',
    },
  };

  private static readonly PRODUCT_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.ObjectListItem',
    },
  };

  private static readonly FOUND_PRODUCTS_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Home',
      metadata: 'sap.m.ObjectListItem',
    },
  };

  private static readonly PRODUCT_STATUS_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.ObjectStatus',
    },
  };

  private static readonly SEARCH_FIELD_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Home',
      metadata: 'sap.m.SearchField',
      id: '*searchField',
    },
  };

  private static readonly FILTER_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.Button',
      id: '*masterListFilterButton',
    },
  };

  private static readonly CART_PRODUCT_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Cart',
      metadata: 'sap.m.ObjectListItem',
    },
  };

  private static readonly CATEGORIES_BACK_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.Button',
      id: '*page-navButton',
    },
  };

  private static readonly RESET_FILTERS_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Category',
      metadata: 'sap.m.Button',
      id: '*categoryFilterDialog-detailresetbutton',
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

  private getCategorySelector(category: ProductCategory): QmateSelector {
    return {
      elementProperties: {
        viewName: 'sap.ui.demo.cart.view.Home',
        metadata: 'sap.m.StandardListItem',
        bindingContextPath: `/ProductCategories*('${category}')`,
      },
    };
  }

  private getFilterTypeSelectorByName(filterType: string): QmateSelector {
    return {
      elementProperties: {
        viewName: 'sap.ui.demo.cart.view.Category',
        metadata: 'sap.m.StandardListItem',
        title: filterType,
      },
    };
  }

  private getFilterOptionSelectorByName(filterOption: string): QmateSelector {
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
    await ui5.userInteraction.click(HomePage.WELCOME_VIEW_ADD_BUTTON_SELECTOR);
  }

  async clickCartButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.CART_BUTTON_SELECTOR);
  }

  async clickProductViewCartButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.PRODUCT_VIEW_CART_BUTTON_SELECTOR);
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
        const title = (await ui5.control.getProperty(el, 'title')) as string;
        return title || '';
      }),
    );
  }

  async getAllFoundProductTitles(): Promise<string[]> {
    const elements = await ui5.element.getAllDisplayed(HomePage.FOUND_PRODUCTS_LIST_SELECTOR);

    return Promise.all(
      elements.map(async (el) => {
        const title = (await ui5.control.getProperty(el, 'title')) as string;
        return title || '';
      }),
    );
  }

  async getAllProductStatuses(): Promise<string[]> {
    const elements = await ui5.element.getAllDisplayed(HomePage.PRODUCT_STATUS_SELECTOR);

    return Promise.all(
      elements.map(async (el) => {
        const title = (await ui5.control.getProperty(el, 'text')) as string;
        return title || '';
      }),
    );
  }

  async searchForProduct(productName: string): Promise<void> {
    await ui5.userInteraction.searchFor(HomePage.SEARCH_FIELD_SELECTOR, productName);
  }

  async selectCategory(category: ProductCategory): Promise<void> {
    await ui5.userInteraction.click(this.getCategorySelector(category));
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

  async selectFirstProduct(): Promise<void> {
    await ui5.userInteraction.click(HomePage.PRODUCT_LIST_SELECTOR, 0);
  }

  async clickAddToCartButtonForSelectedProduct(): Promise<void> {
    await ui5.userInteraction.click(HomePage.PRODUCT_VIEW_ADD_BUTTON_SELECTOR);
  }

  async getProductViewProductName(): Promise<string> {
    return ui5.control.getProperty(
      HomePage.PRODUCT_VIEW_HEADER_SELECTOR,
      'title',
    ) as Promise<string>;
  }

  async clickCategoriesBackButton(): Promise<void> {
    await ui5.userInteraction.click(HomePage.CATEGORIES_BACK_BUTTON_SELECTOR);
  }

  async getCartItems(): Promise<string[]> {
    const elements = await ui5.element.getAllDisplayed(HomePage.CART_PRODUCT_LIST_SELECTOR);

    return Promise.all(
      elements.map(async (el) => {
        const title = (await ui5.control.getProperty(el, 'title')) as string;
        return title || '';
      }),
    );
  }

  async resetFilters(): Promise<void> {
    await ui5.userInteraction.click(HomePage.RESET_FILTERS_BUTTON_SELECTOR);
  }
}

export default new HomePage();
