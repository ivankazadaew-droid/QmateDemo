abstract class BasePage {
    abstract waitForPageToLoad(): Promise<void>;
}