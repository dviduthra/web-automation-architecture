const { chromium } = require('playwright')

class PlaywrightActions {

constructor() {
    this.browser = null
    this.page = null
}

async launchSite(url) {
    this.browser = await chromium.launch({headless:true, channel:"chrome"})
    const context = await this.browser.newContext()
    this.page = await context.newPage()
    await this.page.goto(url)
    }

async clickElement(locator){
    await this.page.locator(locator).click()
    }

async inputText(locator, text){
    await this.page.locator(locator).fill(text)
    }

async getText(locator){
    return await this.page.locator(locator).innerText()
    }

async isDisplayed(locator){
    return await this.page.locator(locator).first().isVisible()
    }

async getCurrentUrl(){
    return this.page.url()
    }

async quit(){
    if(this.browser){
        await this.browser.close()
        }
    }
}

module.exports = PlaywrightActions