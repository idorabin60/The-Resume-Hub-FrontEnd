import express from "express";
import { chromium } from "playwright"; // Correct import of Playwright for Chrome automation
import cors from "cors";

// LinkedIn credentials (replace with your credentials for testing purposes)
(async () => {
  const browser = await chromium.launch({ headless: false }); // Use chromium directly
  const context = await browser.newContext();
  const page = await context.newPage();

  const linkedInEmail = "idorabin60@gmail.com";
  const linkedInPassword = "idoidoido1";

  try {
    // Go to LinkedIn login page
    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "domcontentloaded",
    });

    // Wait for the email input to ensure page is loaded
    const emailInput = await page.waitForSelector('input[name="session_key"]');

    // Check if the login form is available
    if (emailInput) {
      console.log("Not logged in, logging in...");

      // Fill in email and password
      await page.fill('input[name="session_key"]', linkedInEmail);
      await page.fill('input[name="session_password"]', linkedInPassword);

      // Perform login
      await page.click('button[type="submit"]');

      // Wait for login confirmation
      await page.waitForNavigation();

      console.log("Login successful.");

      // After login, navigate to the LinkedIn job post
      const jobUrl =
        "https://www.linkedin.com/jobs/view/4032868011/?alternateChannel=search&refId=ae0pkHVG1yQQFS7ocs15uA%3D%3D&trackingId=%2Fn3wXIeWRDgMpoObXHA5Yw%3D%3D";
      await page.goto(jobUrl, { waitUntil: "domcontentloaded" });

      console.log("Navigated to the job page.");
      await page.waitForTimeout(5000);
      await page.click('[data-test-icon="chevron-down-small"]');
      await page.waitForTimeout(5000);
      const jobDetailsText = await page.$eval(
        "#job-details",
        (el) => el.textContent
      );

      // Output the text in the console
      console.log("Job Details:", jobDetailsText);
      console.log("blablabla");
    } else {
      console.log("Already logged in or login form not found.");
    }
  } catch (error) {
    console.error("Login or navigation failed:", error);
  } finally {
    // Close the browser if needed
    await browser.close();
  }
})();
