import { Builder, By, until } from "selenium-webdriver"

// create driver

let driver = await new Builder().forBrowser("chrome").build()

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


await driver.quit()


