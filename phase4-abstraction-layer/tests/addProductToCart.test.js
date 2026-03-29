const LoginPage = require('../pages/loginPage')
const HomePage = require('../pages/homePage')
const SeleniumActions = require('../core/seleniumActions')

describe("Add product to cart", ()=>{
    let actions
    let loginPage
    let homePage

    beforeAll(async()=>{
        actions = new SeleniumActions()
        loginPage = new LoginPage(actions)
        homePage = new HomePage(actions)
    })

    test("Add product to cart", async()=>{
        await loginPage.open()
        await loginPage.login("standard_user", "secret_sauce")
        expect(await homePage.isLoaded()).toBe(true)
        expect(await homePage.isBackpackVisible()).toBe(true)
        await homePage.addBackpackToCart()
        let count = await homePage.getCartCount()
        expect(count).toBe("1")
    })

    afterAll(async()=>{
        await actions.quit()
    })
})
