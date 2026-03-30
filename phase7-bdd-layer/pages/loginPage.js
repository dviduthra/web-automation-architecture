
class LoginPage {

    constructor(actions) {
        this.actions = actions
    }

    /////////// Locators ////////////

    locators = {
        css: {
            userName: "#user-name",
            password: "#password",
            loginButton: "#login-button",
            errorMessage: "[data-test='error']",
        },

        ai: {
            userName: "the username input field",
            password: "the password input field",
            loginButton: "the login button",
            errorMessage: "the error message"

        }
    }

    get elements() {
        const tool = process.env.TOOL
        return tool === 'ai' ? this.locators.ai : this.locators.css
    }

    /////////// Actions ////////////



    async open() {
        await this.actions.launchSite("https://www.saucedemo.com")
    }

    async login(user, pass) {
        await this.actions.inputText(this.elements.userName, user)
        await this.actions.inputText(this.elements.password, pass)
        await this.actions.clickElement(this.elements.loginButton)
    }


    async getErrorMessage() {
        return await this.actions.getText(this.elements.errorMessage)
    }
}

module.exports = LoginPage