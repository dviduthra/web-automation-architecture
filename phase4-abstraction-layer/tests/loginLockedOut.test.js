const { Builder } = require('selenium-webdriver')
const LoginPage = require('../pages/loginPage')
const SeleniumActions = require('../core/seleniumActions')

describe("Saucedemo Locked Login", ()=>{
    let actions
    let loginPage
    
    beforeAll(async()=>{
        actions = new SeleniumActions()
        loginPage = new LoginPage(actions)
        
    })

    test("Login with lockedout user", async()=>{
        await loginPage.open()
        await loginPage.login("locked_out_user", "secret_sauce")
        await loginPage.loginLockedOutError("Epic sadface: Sorry, this user has been locked out.")

    })

    afterAll(async()=>{
        await actions.quit()
    })

})