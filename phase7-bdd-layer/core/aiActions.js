require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const { ai } = require("@zerostep/playwright");

class AIActions {
  constructor() {
    const token = process.env.ZEROSTEP_TOKEN;
    if (!token) {
      throw new Error("ZEROSTEP_TOKEN missing in environment");
    }
    this.ai = null;
    this.testContext = null;
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  buildTestShim() {
    return {
      info: () => ({ title: "jest-ai-test" }),
      step: async (name, fn) => fn(),
    };
  }

  async launchSite(url) {
    const { chromium } = require("playwright");
    this.browser = await chromium.launch({
      headless: false,
      channel: "chrome",
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(30000);
    this.testContext = this.buildTestShim();
    await this.page.goto(url);
  }

  async waitForElement(locator) {
    return true;
  }

  async clickElement(locator) {
    await ai(`Click ${locator}`, {
      page: this.page,
      test: this.testContext,
    });
  }

  async inputText(locator, text) {
    await ai(`Type ${text} into ${locator}`, {
      page: this.page,
      test: this.testContext,
    });
  }

  async getText(locator) {
    return await ai(`Get the text content of ${locator}`, {
      page: this.page,
      test: this.testContext,
    });
  }

  async isDisplayed(locator) {
    const result = await ai(
      `Is ${locator} visible on the page? Answer only true or false`,
      {
        page: this.page,
        test: this.testContext,
      },
    );

    return String(result).toLowerCase().includes("true");
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async quit() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();

    this.page = null;
    this.context = null;
    this.browser = null;
    this.testContext = null;
  }
}

module.exports = AIActions;
