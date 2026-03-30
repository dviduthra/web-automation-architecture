const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");
const DriverFactory = require("../core/driverFactory");

describe("Add product to cart", () => {
  let actions;
  let loginPage;
  let homePage;

  beforeAll(async () => {
    actions = DriverFactory.getDriver();
    loginPage = new LoginPage(actions);
    homePage = new HomePage(actions);
  });

  test("Add product to cart", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    expect(await homePage.isLoaded()).toBe(true);
    expect(await homePage.isBackpackVisible()).toBe(true);
    await homePage.addBackpackToCart();
    let count = await homePage.getCartCount();
    expect(count).toBe("1");
  });

  afterAll(async () => {
    if (actions) {
      await actions.quit();
    }
  });

  // afterAll(() => {
  //     jest.clearAllTimers()
  // })
});
