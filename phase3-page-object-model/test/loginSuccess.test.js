const { Builder } = require("selenium-webdriver")

const LoginPage = require("../pages/loginPage")

describe("SauceDemo Login", ()=>{
    let driver
    let loginPage

    beforeAll(async()=>{

        driver = await new Builder().forBrowser("chrome").build()
        loginPage = new LoginPage(driver)
    })

    test("user login Successfully", async()=>{
        await loginPage.open()
        await loginPage.enterUserName("standard_user")
        await loginPage.enterPassword("secret_sauce")
        await loginPage.clickLoginButton()
        let url = await driver.getCurrentUrl()
        expect(url).toContain("inventory")

    })

    afterAll(async()=>{
        await driver.quit()

    })

})