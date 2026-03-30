Feature: Locked out login

Scenario: Login with lockedout user 
Given Launch Saucelabs login page
When Login with username "locked_out_user" and password "secret_sauce"
Then There should be error message "Epic sadface: Sorry, this user has been locked out."