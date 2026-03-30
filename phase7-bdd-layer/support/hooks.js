const { Before, After } = require("@cucumber/cucumber");
const DriverFactory = require("../core/driverFactory");
const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");

Before(async function () {
  this.actions = DriverFactory.getDriver();
  this.loginPage = new LoginPage(this.actions);
  this.homePage = new HomePage(this.actions);
});

After(async function () {
  if (this.actions) {
    await this.actions.quit();
  }
});
