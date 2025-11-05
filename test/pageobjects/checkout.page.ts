import BasePage from './base.page.ts';

class CheckoutPage extends BasePage {
  static readonly ITEMS_LIST_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.WizardStep',
      id: '*contentsStep',
    },
  };

  static readonly STEP_2_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Button',
      id: '*contentsStep-nextButton',
    },
  };

  static readonly STEP_3_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Button',
      id: '*paymentTypeStep-nextButton',
    },
  };

  static readonly STEP_4_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Button',
      id: '*creditCardStep-nextButton',
    },
  };

  static readonly STEP_5_BUTTON_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Button',
      id: '*invoiceStep-nextButton',
    },
  };

  static readonly CARD_HOLDER_NAME_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Input',
      id: '*creditCardHolderName',
    },
  };

  static readonly CARD_NUMBER_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.MaskInput',
      id: '*creditCardNumber',
    },
  };

  static readonly SECURITY_CODE_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.MaskInput',
      id: '*creditCardSecurityNumber',
    },
  };

  static readonly EXPIRATION_DATE_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.DatePicker',
      id: '*creditCardExpirationDate',
    },
  };

  static readonly ADDRESS_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Input',
      id: '*invoiceAddressAddress',
    },
  };

  static readonly CITY_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Input',
      id: '*invoiceAddressCity',
    },
  };

  static readonly ZIP_CODE_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Input',
      id: '*invoiceAddressZip',
    },
  };

  static readonly COUNTRY_INPUT_SELECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Input',
      id: '*invoiceAddressCountry',
    },
  };

  static readonly ORDER_SUMMARY_BUTTON_SLECTOR = {
    elementProperties: {
      viewName: 'sap.ui.demo.cart.view.Checkout',
      metadata: 'sap.m.Button',
      id: '*deliveryTypeStep-nextButton',
    },
  };

  async waitForPageToLoad(): Promise<void> {
    await ui5.element.getDisplayed(CheckoutPage.ITEMS_LIST_SELECTOR, 0, 10000);
  }

  async clickStep2Button(): Promise<void> {
    await ui5.userInteraction.click(CheckoutPage.STEP_2_BUTTON_SELECTOR);
  }

  async clickStep3Button(): Promise<void> {
    await ui5.userInteraction.click(CheckoutPage.STEP_3_BUTTON_SELECTOR);
  }

  async clickStep4Button(): Promise<void> {
    await ui5.userInteraction.click(CheckoutPage.STEP_4_BUTTON_SELECTOR);
  }

  async clickStep5Button(): Promise<void> {
    await ui5.userInteraction.click(CheckoutPage.STEP_5_BUTTON_SELECTOR);
  }

  async inputCardHolderName(name: string): Promise<void> {
    await ui5.userInteraction.fill(CheckoutPage.CARD_HOLDER_NAME_INPUT_SELECTOR, name);
  }

  async inputCardNumber(number: string): Promise<void> {
    await ui5.userInteraction.clearAndFill(CheckoutPage.CARD_NUMBER_INPUT_SELECTOR, number);
  }

  async inputSecurityCode(code: string): Promise<void> {
    await ui5.userInteraction.clearAndFill(CheckoutPage.SECURITY_CODE_INPUT_SELECTOR, code);
  }

  async inputExpirationDate(date: string): Promise<void> {
    await ui5.userInteraction.clearAndFill(CheckoutPage.EXPIRATION_DATE_INPUT_SELECTOR, date);
  }

  async inputAddress(address: string): Promise<void> {
    await ui5.userInteraction.fill(CheckoutPage.ADDRESS_INPUT_SELECTOR, address);
  }

  async inputCity(city: string): Promise<void> {
    await ui5.userInteraction.fill(CheckoutPage.CITY_INPUT_SELECTOR, city);
  }

  async inputZipCode(zipCode: string): Promise<void> {
    await ui5.userInteraction.fill(CheckoutPage.ZIP_CODE_INPUT_SELECTOR, zipCode);
  }

  async inputCountry(country: string): Promise<void> {
    await ui5.userInteraction.fill(CheckoutPage.COUNTRY_INPUT_SELECTOR, country);
  }

  async clickOrderSummaryButton(): Promise<void> {
    await ui5.userInteraction.click(CheckoutPage.ORDER_SUMMARY_BUTTON_SLECTOR);
  }
}

export default new CheckoutPage();
