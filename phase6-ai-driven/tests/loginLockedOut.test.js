const LoginPage = require('../pages/loginPage')
const DriverFactory = require('../core/driverFactory')

describe("Saucedemo Locked Login", () => {
    let actions
    let loginPage

    beforeAll(async () => {
        actions = DriverFactory.getDriver()
        loginPage = new LoginPage(actions)

    })

    test("Login with lockedout user", async () => {
        await loginPage.open()
        await loginPage.login("locked_out_user", "secret_sauce")
        const errorMessage = await loginPage.loginLockedOutError()
        expect(errorMessage).toContain("Epic sadface: Sorry, this user has been locked out.")

    })

    afterAll(async () => {
        if (actions) {
            await actions.quit()
        }
    })

})