const { Builder } = require('selenium-webdriver')
const LoginPage = require('../pages/loginPage')
const HomePage = require('../pages/homePage')
const DriverFactory = require('../core/driverFactory')

describe("Saucedemo Login", ()=>{
    let actions
    let loginPage
    let homePage

    beforeAll(async()=>{
        actions = DriverFactory.getDriver()
        loginPage = new LoginPage(actions)
        homePage = new HomePage(actions)
    })

    test("user login succcessfully", async()=>{
        await loginPage.open()
        await loginPage.login("standard_user", "secret_sauce")
        expect(await homePage.isLoaded()).toBe(true)

    })

    afterAll(async()=>{
        await actions.quit()
    })

})