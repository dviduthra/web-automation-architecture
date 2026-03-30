import { Builder, By, until } from "selenium-webdriver";

// start browser
let driver = await new Builder().forBrowser("chrome").build();

await driver.get("https://www.saucedemo.com");

await driver
  .findElement(By.css("[data-test='username']"))
  .sendKeys("locked_out_user");

await driver.findElement(By.name("password")).sendKeys("secret_sauce");

await driver.findElement(By.css("[data-test='login-button']")).click();

let errorElement = await driver.findElement(By.css("[data-test='error']"));

let errorText = await errorElement.getText();

console.assert(
  errorText.includes("Epic sadface: Sorry, this user has been locked out."),
  "Error mismatch",
);

await driver.quit();
