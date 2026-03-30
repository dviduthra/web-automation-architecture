const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");
const SeleniumActions = require("../core/seleniumActions");

describe("Saucedemo Login", () => {
  let actions;
  let loginPage;
  let homePage;

  beforeAll(async () => {
    actions = new SeleniumActions();
    loginPage = new LoginPage(actions);
    homePage = new HomePage(actions);
  });

  test("user login succcessfully", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    expect(await homePage.isLoaded()).toBe(true);
  });

  afterAll(async () => {
    await actions.quit();
  });
});
