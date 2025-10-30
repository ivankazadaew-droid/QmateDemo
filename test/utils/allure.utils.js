import allure from '@wdio/allure-reporter'

export async function takeScreenshotAndAttach() {
    const screenshotBase64 = await browser.takeScreenshot();

    const screenshotBuffer = Buffer.from(screenshotBase64, 'base64');
    
    allure.addAttachment('Screenshot', screenshotBuffer, 'image/png');
}