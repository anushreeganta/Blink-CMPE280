const { Builder, By, Key, until, web } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  //   opts = webdriver.ChromeOptions()
  //   opts.binary_location(value = "C:/Program FilesGoogle\\Chrome\\Application\\chrome.exe")
  //   driver = webdriver.Chrome(chrome_options = opts)
  try {
    await driver.get("http://localhost:3000");
    inputField = driver.findElement(By.id("Email"));
    var email = "sai3@sai.com"; // not really long for the sake of this quick example
    var password = "sai123";
    // this works but is slow
    await inputField.sendKeys(email);

    inputField = driver.findElement(By.id("Pass"));
    await inputField.sendKeys(password);

    loginButton = driver.findElement(By.id("Login"));
    await loginButton.click();

    await driver.sleep(1000);

    // menu = driver.findElement(By.id("menu-appbar"));
    // menu.click();

    // logout = driver.findElement(By.id("logout"));
    // logout.click();

    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }

//   driver = await new Builder().forBrowser("chrome").build();

  try {
    // await driver.get("http://localhost:3000/register");
    // inputField = driver.findElement(By.id("email"));
    // var email = "sai3@sai.com"; // not really long for the sake of this quick example
    // var password = "sai123";
    // var username = "sai";
    // // this works but is slow
    // await inputField.sendKeys(email);

    // inputField = driver.findElement(By.id("pass"));
    // await inputField.sendKeys(password);

    // inputField = driver.findElement(By.id("cPass"));
    // await inputField.sendKeys(password);

    // nextButton = driver.findElement(By.id("next"));
    // await nextButton.click();

    // inputField = driver.findElement(By.id("username"));
    // await inputField.sendKeys(username);

    // var ddlElement = driver.findElement(By.id("type"));
    // ddlElement.click();
    // await driver.sleep(7000)
    // let ele = await driver.findElement(By.xpath("//*[contains(text(), 'Admin')]"))
    // ele.click()
    // ddlElement.sendKeys("Admin");
    // ddlElement.click();

    // await driver.sleep(1000)

    // // menu = driver.findElement(By.id("menu-appbar"));
    // // menu.click();

    // // logout = driver.findElement(By.id("logout"));
    // // logout.click();

    // // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    //await driver.quit();
  }
})();
