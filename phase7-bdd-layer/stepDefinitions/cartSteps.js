const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("expect");

Then("Home page should be loaded", async function () {
  expect(await this.homePage.isLoaded()).toBe(true);
});

Then("Verify Saucelabs Backpack is visible", async function () {
  expect(await this.homePage.isBackpackVisible()).toBe(true);
});

When("Add the saucelabs backpack to the cart", async function () {
  await this.homePage.addBackpackToCart();
});

Then("The cart badge should show {string}", async function (count) {
  const cart = await this.homePage.getCartCount();
  expect(cart).toBe(count);
});
