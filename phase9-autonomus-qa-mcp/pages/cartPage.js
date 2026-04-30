class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.cartItems = page.locator(".cart_item");
    this.removeButtons = page.locator('[data-test^="remove-"]');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeItem(index) {
    const buttons = await this.removeButtons.all();
    if (buttons[index]) {
      await buttons[index].click();
    }
  }

  async isItemInCart(productName) {
    return await this.page.getByText(productName).isVisible();
  }
}

module.exports = CartPage;
