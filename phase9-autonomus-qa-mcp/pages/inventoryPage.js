class InventoryPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productTitle = page.locator('[data-test="product-sort-container"]');
  }

  async getCartCount() {
    const badge = await this.cartBadge.textContent();
    return badge ? parseInt(badge.replace(/"/g, "")) : 0;
  }

  async addToCart(productName) {
    const productSlug = productName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/\./g, "");
    const addButton = this.page.locator(
      `[data-test="add-to-cart-${productSlug}"]`,
    );
    await addButton.click();
  }

  async removeFromCart(productName) {
    const productSlug = productName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/\./g, "");
    const removeButton = this.page.locator(
      `[data-test="remove-${productSlug}"]`,
    );
    await removeButton.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async isProductVisible(productName) {
    return await this.page.getByText(productName).isVisible();
  }
}

module.exports = InventoryPage;
