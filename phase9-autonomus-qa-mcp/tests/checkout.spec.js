const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");

test.describe("Checkout Tests", () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("complete checkout flow with valid data", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bolt T-Shirt");
    await inventoryPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInfo("John", "Doe", "12345");
    await checkoutPage.continue();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );
    const total = await checkoutPage.getOrderTotal();
    expect(total).toContain("Total: $49.66");

    await checkoutPage.finish();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test("empty cart checkout", async ({ page }) => {
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInfo("Test", "User", "54321");
    await checkoutPage.continue();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );
    const total = await checkoutPage.getOrderTotal();
    expect(total).toContain("Total: $0.00");

    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test("form validation - missing first name", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo("", "Doe", "12345");
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain("First Name is required");
  });

  test("form validation - missing last name", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo("John", "", "12345");
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain("Last Name is required");
  });

  test("form validation - missing postal code", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo("John", "Doe", "");
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain("Postal Code is required");
  });

  test("cancel checkout returns to cart", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.cancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });
});
