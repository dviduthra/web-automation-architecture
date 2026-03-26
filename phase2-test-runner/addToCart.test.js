const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

describe("Add to cart", () => {

    let driver

    beforeAll(async() => {
        const options = new chrome.Options()
        options.setUserPreferences({
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false,
            "profile.password_manager_leak_detection": false
        })

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build()
    })

test("Add item to cart and verify cart badge", async() => {

await driver.get("https://www.saucedemo.com")

await driver.findElement(By.name("user-name")).sendKeys("standard_user")

await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("secret_sauce")

await driver.findElement(By.id("login-button")).click()

let url = await driver.getCurrentUrl()
console.assert(url.includes('inventory'))

let product = await driver.findElement(By.xpath("//div[contains(text(),'Sauce Labs Backpack')]"))
console.assert(product)

await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click()

let cart = await driver.findElement(By.css("[data-test='shopping-cart-badge']"))

let addedCart = await cart.getText()
console.assert(addedCart.includes("1"))

})

afterAll(async() => {

await driver.quit()

})
  
})