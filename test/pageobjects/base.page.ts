export default abstract class BasePage {
    public abstract waitForPageToLoad(): Promise<void>;
}