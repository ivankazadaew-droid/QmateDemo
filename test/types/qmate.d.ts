declare namespace ui5 {
  interface ElementModule {
    getDisplayed(selector: object, index?: number, timeout?: number): Promise<WebdriverIO.Element>;
    getAllDisplayed(selector: string | Record<string, unknown>): Promise<WebdriverIO.Element[]>;
    isVisible(selector: object, timeout?: number): Promise<boolean>;
    getPropertyValue(
      selector: object,
      property: string,
      index?: number,
      timeout?: number,
    ): Promise<unknown>;
    get(
      selector: object,
      scope?: WebdriverIO.Element,
      index?: number,
      timeout?: number,
    ): Promise<WebdriverIO.Element>;
  }
  const element: ElementModule;

  interface ControlModule {
    getProperty<T = unknown>(element: unknown, propertyName: string): Promise<T>;
  }
  const control: ControlModule;

  interface UserInteractionModule {
    click(selector: object, timeout?: number): Promise<void>;
    fill(selector: object, value: string | number, timeout?: number): Promise<void>;
    clearAndFill(selector: object, value: string | number, timeout?: number): Promise<void>;
    check(selector: object, timeout?: number): Promise<void>;
    searchFor(selector: object, value: string, timeout?: number): Promise<void>;
    clickListItem(selector: object, timeout?: number): Promise<void>;
  }
  const userInteraction: UserInteractionModule;

  interface ConfirmationDialogModule {
    expectDialogToBeVisible(timeout?: number): Promise<void>;
    clickConfirmButton(): Promise<void>;
    clickCancelButton(): Promise<void>;
    clickOk(): Promise<void>;
    clickYes(): Promise<void>;
  }
  const confirmationDialog: ConfirmationDialogModule;

  interface NavigationBarModule {
    clickBack(timeout?: number): Promise<void>;
  }
  const navigationBar: NavigationBarModule;
}

declare namespace common {
  interface MiscModule {
    waitForLoading(timeout?: number): Promise<void>;
  }
  const misc: MiscModule;

  interface UserInteractionModule {
    pressEnter(): Promise<void>;
    searchFor(selector: object, value: string, timeout?: number): Promise<void>;
  }
  const userInteraction: UserInteractionModule;

  interface AssertionModule {
    expectTrue(value: boolean, message?: string): Promise<void>;
    expectToContain(
      actualValue: string | number,
      expectedSubString: string | number,
      message?: string,
      timeout?: number,
    ): Promise<void>;
    expectEqual(
      actualValue: unknown,
      expectedValue: unknown,
      message?: string,
      timeout?: number,
    ): Promise<void>;
  }
  const assertion: AssertionModule;
}
