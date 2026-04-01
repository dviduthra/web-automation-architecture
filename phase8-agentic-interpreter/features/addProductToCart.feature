Feature: Add to cart

Scenario: Add product to cart
Given Launch Saucelabs login page
When Login with username "standard_user" and password "secret_sauce"
Then Home page should be loaded
And Verify Saucelabs Backpack is visible
When Add the saucelabs backpack to the cart 
Then The cart badge should show "1" 
