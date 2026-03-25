const { By } = require("selenium-webdriver")

class LoginPage {

constructor(actions){
this.actions = actions
}

/////////// Locators ////////////

userName = "#user-name"
password = "#password"
loginButton = "#login-button"
errorMessage = "[data-test='error']"
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