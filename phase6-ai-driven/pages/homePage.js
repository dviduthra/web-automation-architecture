class HomePage {
  constructor(actions) {
    this.actions = actions;
  }

  /////////// Locators ////////////

  locators = {
    css: {
      backpackItem: ".inventory_item_name",
      cartBadge: "[data-test='shopping-cart-badge']",
      backPackAddButton: "[data-test='add-to-cart-sauce-labs-backpack']",
    },

    ai: {
      backpackItem: "the Sauce Labs Backpack product name",
      cartBadge: "the shopping cart badge",
      backPackAddButton: "the Add to cart button for Sauce Labs Backpack",
    },
  };

  get elements() {
    const tool = process.env.tool;
    return tool === "ai" ? this.locators.ai : this.locators.css;
  }

  /////////// Actions ////////////

  async isLoaded() {
    let url = await this.actions.getCurrentUrl();
    return url.includes("inventory");
  }

  async isBackpackVisible() {
    return await this.actions.isDisplayed(this.elements.backpackItem);
  }

  async addBackpackToCart() {
    await this.actions.clickElement(this.elements.backPackAddButton);
  }

  async getCartCount() {
    return await this.actions.getText(this.elements.cartBadge);
  }
}

module.exports = HomePage;
