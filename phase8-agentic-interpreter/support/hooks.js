require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const {
  Before,
  After,
  setWorldConstructor,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const DriverFactory = require("../core/driverFactory");
const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");
const AgenticExecutor = require("../core/agenticExecutor");

setDefaultTimeout(200000);

setWorldConstructor(function () {});

Before(async function () {
  this.actions = DriverFactory.getDriver();

  // Initialize Page Objects as usual
  const loginPage = new LoginPage(this.actions);
  const homePage = new HomePage(this.actions);

  this.loginPage = loginPage;
  this.homePage = homePage;

  // Pass Page Object instances to AgenticExecutor, the keys must match the class names in manifest exactly
  this.agenticExecutor = new AgenticExecutor({
    LoginPage: loginPage,
    HomePage: homePage,
  });
});

After(async function () {
  await this.actions.quit();
});
