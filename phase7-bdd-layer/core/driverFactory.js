require("dotenv").config({ path: __dirname + '/../.env' })
const SeleniumActions = require('./seleniumActions')
const PlaywrightActions = require('./playwrightActions')
const AIActions = require('./AIActions')


class DriverFactory {
    static getDriver() {

        const tool = process.env.TOOL || "selenium"

        if (tool === "ai") {
            console.info("Running with ai")
            return new AIActions()

        }

        if (tool === "playwright") {

            console.log("Running with Playwright")
            return new PlaywrightActions()
        }

        console.log("Running with Selenium")
        return new SeleniumActions()
    }
}
module.exports = DriverFactory