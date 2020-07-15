/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = require("selenium-webdriver").By;

let browser;


// Does not work with WSL!! Use cygwin



// Test Suite
test.describe("Me-Sida", function() {

    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://pamo18.me");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test index", function(done) {
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, "Me-Sida");
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Om Mig Själv");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(""));
        });

        done();
    });

    test.it("Test go to redovisning", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Redovisning")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Kmom01");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/reports/week/1"));
        });

        done();
    });

    test.it("Test go to kmom03", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Redovisning")).then(function(element) {
            element.click();
        });

        browser.findElement(By.linkText("Kmom03")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Kmom03");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/reports/week/3"));
        });

        done();
    });

    test.it("Test go to register", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Register")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Registration");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/register"));
        });

        done();
    });

    test.it("Test login", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Login")).then(function(element) {
            element.click();
        });

        browser.findElement(By.name("name")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.findElement(By.name("login")).then(function(element) {
            element.click();
        });

        browser.sleep(2000);

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Profile page");
            });
        });

        // Check correct heading
        browser.findElement(By.css("h3")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Username: doe");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/profile"));
        });

        browser.findElement(By.name("logoff")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Login");
            });
        });

        done();
    });

    test.it("Test go to profile", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Profile")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Profile page");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/profile"));
        });

        done();
    });
});
