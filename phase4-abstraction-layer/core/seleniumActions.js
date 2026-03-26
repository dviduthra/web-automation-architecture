const { Builder, By, until } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")  // ✅ add this import

class SeleniumActions {

    constructor(){
        const options = new chrome.Options()
        options.setUserPreferences({
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false,
            "profile.password_manager_leak_detection": false  // ✅ kills the breach popup
        })

        this.driver = new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)   // ✅ pass options here
            .build()
        this.timeout = 10000
    }
    
    async launchSite(url){
        await this.driver.get(url)
    }

    async waitForElement(locator){
        await this.driver.wait(until.elementLocated(locator), this.timeout)
        const element = await this.driver.findElement(locator)
        await this.driver.wait(until.elementIsVisible(element), this.timeout)
        return element
    }

    async isDisplayed(locator){
        const element = await this.waitForElement(locator)
        return await element.isDisplayed()
    }

    async clickElement(locator){
        const element = await this.waitForElement(locator)
        await element.click()

    }

    async inputText(locator, text){
        const element = await this.waitForElement(locator)
        await element.clear()
        await element.sendKeys(text)
        

    }

    async getText(locator){
        const element = await this.waitForElement(locator)
        return await element.getText()

    }

    async getCurrentUrl(){
        return await this.driver.getCurrentUrl()
    }

    async quit(){
        await this.driver.quit()
    }

}

module.exports = SeleniumActions