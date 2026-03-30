const { By } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  /////////// Locators ////////////

  userName = By.name("user-name");
  password = By.css("input[placeholder= 'Password']");
  loginButton = By.id("login-button");
  errorMessage = By.css("[data-test='error']");

  /////////// Actions ////////////

  async open() {
    await this.driver.get("https://www.saucedemo.com");
  }

  async enterUserName(user) {
    await this.driver.findElement(this.userName).sendKeys(user);
  }

  async enterPassword(pass) {
    await this.driver.findElement(this.password).sendKeys(pass);
  }

  async clickLoginButton() {
    await this.driver.findElement(this.loginButton).click();
  }
  async loginLockedOutError() {
    return await this.driver.findElement(this.errorMessage).getText();
  }
}
module.exports = LoginPage;
