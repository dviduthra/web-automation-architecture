const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");

describe("SauceDemo Locked Login", () => {
  let driver;
  let loginPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
  });

  test("Login with locked out user", async () => {
    await loginPage.open();
    await loginPage.enterUserName("locked_out_user");
    await loginPage.enterPassword("secret_sauce");
    await loginPage.clickLoginButton();
    let errorText = await loginPage.loginLockedOutError();
    expect(errorText).toContain(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
  afterAll(async () => {
    await driver.quit();
  });
});
