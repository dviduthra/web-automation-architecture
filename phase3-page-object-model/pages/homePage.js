const { By } = require("selenium-webdriver");

class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  /////////// Locators ////////////
  product = By.xpath("//div[contains(text(),'Sauce Labs Backpack')]");

  addToCartProd = By.id("add-to-cart-sauce-labs-backpack");
  cartBadge = By.css("[data-test='shopping-cart-badge']");

  /////////// Actions ////////////
  async isBackpackVisible() {
    return await this.driver.findElement(this.product);
  }

  async addBackpackToCart() {
    await this.driver.findElement(this.addToCartProd).click();
  }

  async getCartCount() {
    let cart = await this.driver.findElement(this.cartBadge);
    return await cart.getText();
  }
}
module.exports = HomePage;
