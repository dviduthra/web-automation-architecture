const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('expect')


Given('Launch Saucelabs login page', async function (){
    await this.loginPage.open()
})

When('Login with username {string} and password {string}', async function (username, password){
    await this.loginPage.login(username, password)
})


Then('There should be error message {string}', async function(errorText){
    const errorMessage = await this.loginPage.getErrorMessage()
    expect(errorMessage).toContain(errorText)

})

