const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");

test.describe("Cart Tests", () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("add multiple items to cart updates count", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    let count = await inventoryPage.getCartCount();
    expect(count).toBe(1);

    await inventoryPage.addToCart("Sauce Labs Bike Light");
    count = await inventoryPage.getCartCount();
    expect(count).toBe(2);

    await inventoryPage.addToCart("Sauce Labs Bolt T-Shirt");
    count = await inventoryPage.getCartCount();
    expect(count).toBe(3);
  });

  test("remove item from cart", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await inventoryPage.addToCart("Sauce Labs Bolt T-Shirt");

    await inventoryPage.goToCart();
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBe(3);

    await cartPage.removeItem(1);
    const finalCount = await cartPage.getCartItemCount();
    expect(finalCount).toBe(2);
  });

  test("cart count updates after removal", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");

    await inventoryPage.goToCart();
    await cartPage.removeItem(0);

    await page.goBack();
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });
});
