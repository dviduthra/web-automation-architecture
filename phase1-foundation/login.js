// import Build → Find → Wait 
// Builder => creates driver, By => find elements, until => wait for things 

import { Builder, By, until } from "selenium-webdriver"

// create driver or start browser 
let driver = await new Builder().forBrowser("chrome").build()

// open site
await driver.get("https://www.saucedemo.com")

await driver.findElement(By.id("user-name")).sendKeys("standard_user")

await driver.findElement(By.id("password")).sendKeys("secret_sauce")

await driver.findElement(By.id("login-button")).click()

let url = await driver.getCurrentUrl()
console.assert(url.includes('inventory'))

await driver.quit()





