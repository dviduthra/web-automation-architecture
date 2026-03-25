const { By } = require("selenium-webdriver")

class HomePage {

constructor(actions){
    this.actions = actions
}

/////////// Locators ////////////

backpackItem = ".inventory_item_name"
backPackAddButton = "#add-to-cart-sauce-labs-backpack"
cartBadge = "[data-test='shopping-cart-badge']"

/////////// Actions ////////////

async isLoaded(){
    let url = await this.actions.getCurrentUrl()
    return url.includes("inventory")
    }

async isBackpackVisible(){
    return await this.actions.isDisplayed(this.backpackItem)
}

async addBackpackToCart(){
    await this.actions.clickElement(this.backPackAddButton)
}

async getCartCount(){
    return await this.actions.getText(this.cartBadge)
}

}

module.exports = HomePage