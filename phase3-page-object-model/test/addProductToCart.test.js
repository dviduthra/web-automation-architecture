const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome') 
const LoginPage = require('../pages/loginPage')
const HomePage = require('../pages/homePage')

describe("Add to cart", ()=>{
    let driver
    let loginPage
    let homePage

    beforeAll(async()=>{
        const options = new chrome.Options()
        options.setUserPreferences({
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false,
            "profile.password_manager_leak_detection": false
        })

        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build()
        loginPage = new LoginPage(driver)
        homePage = new HomePage(driver)

    })

    test("Add product to cart", async()=>{
        await loginPage.open()
        await loginPage.enterUserName("standard_user")
        await loginPage.enterPassword("secret_sauce")
        await loginPage.clickLoginButton()
        let url = await driver.getCurrentUrl()
        expect(url).toContain("inventory")
        await homePage.isBackpackVisible()
        await homePage.addBackpackToCart()
        await homePage.getCartCount("1")
    })

    afterAll(async()=>{
        await driver.quit()
    })

})