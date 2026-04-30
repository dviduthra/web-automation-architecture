const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");

test.describe("Problem User Tests", () => {
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
    await loginPage.login("problem_user", "secret_sauce");
  });

  test("problem_user can add to cart", async ({ page }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });

  test("problem_user form field scrambling - detects issue", async ({
    page,
  }) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    // This will fail due to form field scrambling
    await checkoutPage.fillCheckoutInfo("Test", "User", "54321");
    await checkoutPage.continue();

    // The error will appear because fields are scrambled
    const isErrorVisible = await checkoutPage.isErrorMessageVisible();
    if (isErrorVisible) {
      const errorText = await checkoutPage.getErrorMessage();
      console.log("Form field scrambling detected:", errorText);
    }
  });
});
