Feature: Saucelabs login

Scenario: Successful login with valid credentials 
Given Launch Saucelabs login page
When Login with username "standard_user" and password "secret_sauce"
Then Home page should be loaded 

