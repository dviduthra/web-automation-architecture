const { By } = require("selenium-webdriver");

class HomePage {
  constructor(actions) {
    this.actions = actions;
  }

  /////////// Locators ////////////

  backpackItem = ".inventory_item_name";
  // backPackAddButton = "#add-to-cart-sauce-labs-backpack"
  cartBadge = "[data-test='shopping-cart-badge']";
  backPackAddButton = "[data-test='add-to-cart-sauce-labs-backpack']";

  /////////// Actions ////////////

  async isLoaded() {
    let url = await this.actions.getCurrentUrl();
    return url.includes("inventory");
  }

  async isBackpackVisible() {
    return await this.actions.isDisplayed(this.backpackItem);
  }

  async addBackpackToCart() {
    await this.actions.waitForElement(this.backPackAddButton); // ✅ wait before clicking
    await this.actions.clickElement(this.backPackAddButton);
    await this.actions.waitForElement(this.cartBadge);
  }

  async getCartCount() {
    return await this.actions.getText(this.cartBadge);
  }
}

module.exports = HomePage;
