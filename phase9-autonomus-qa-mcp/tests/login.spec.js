const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");

test.describe("Login Tests", () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test("valid login with standard_user", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.menuButton).toBeVisible();
  });

  test("invalid login shows error message", async ({ page }) => {
    await loginPage.login("invalid_user", "wrong_password");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain("Username and password do not match");
  });

  test("locked_out_user cannot login", async ({ page }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain("locked out");
  });

  test("problem_user can login but has issues", async ({ page }) => {
    await loginPage.login("problem_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.menuButton).toBeVisible();
  });
});
