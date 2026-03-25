const { By } = require("selenium-webdriver")

class LoginPage {

constructor(actions){
this.actions = actions
}

/////////// Locators ////////////

userName = By.name("user-name")
password = By.css("input[placeholder='Password']")
loginButton = By.id("login-button")
errorMessage = By.css("[data-test='error']")
webUrl = "https://www.saucedemo.com"

/////////// Actions ////////////

async open(){
    await this.actions.launchSite(this.webUrl)
    }

async login(user, pass){
    await this.actions.inputText(this.userName,user)
    await this.actions.inputText(this.password,pass)
    await this.actions.clickElement(this.loginButton)
    }


async loginLockedOutError(){
    return await this.actions.getText(this.errorMessage)
    }
}

module.exports = LoginPage