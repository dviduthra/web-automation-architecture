const { By } = require("selenium-webdriver");

class HomePage {
  constructor(actions) {
    this.actions = actions;
  }

  /////////// Locators ////////////

  backpackItem = By.xpath("//div[contains(text(),'Sauce Labs Backpack')]");
  backPackAddButton = By.id("add-to-cart-sauce-labs-backpack");
  cartBadge = By.css("[data-test='shopping-cart-link']");

  /////////// Actions ////////////

  async isLoaded() {
    let url = await this.actions.getCurrentUrl();
    return url.includes("inventory");
  }

  async isBackpackVisible() {
    return await this.actions.isDisplayed(this.backpackItem);
  }

  async addBackpackToCart() {
    await this.actions.waitForElement(this.backPackAddButton);
    await this.actions.clickElement(this.backPackAddButton);
    await this.actions.waitForElement(this.cartBadge);
  }

  async getCartCount() {
    return await this.actions.getText(this.cartBadge);
  }
}

module.exports = HomePage;
