const SeleniumActions = require('./seleniumActions')
const PlaywrightActions = require('./playwrightActions')

class DriverFactory {
    static getDriver() {

        const tool = process.env.TOOL

        if (tool == "playwright") {

            console.log("Running with Playwright")
            return new PlaywrightActions()
        }
        console.log("Running with Selenium")
        return new SeleniumActions()
    }
}
module.exports = DriverFactory