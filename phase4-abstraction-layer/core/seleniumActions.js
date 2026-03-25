const { Builder, By, until } = require("selenium-webdriver")

class SeleniumActions {


    constructor(driver){
        this.driver = new Builder().forBrowser("chrome").build()
        this.timeout = 5000
    
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