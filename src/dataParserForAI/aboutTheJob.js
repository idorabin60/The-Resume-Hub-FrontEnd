import { chromium } from "playwright";

export async function extractJobDetails(jobURL) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Helper function to retry an action
  async function retryUntilSuccess(action, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        return await action(); // Perform the action
      } catch (error) {
        if (i === retries - 1) {
          throw error; // Rethrow after final retry
        }
        console.log(`Retry ${i + 1}/${retries} failed. Retrying...`);
      }
    }
  }

  try {
    // Navigate to the LinkedIn job page
    await retryUntilSuccess(
      () => page.goto(jobURL, { waitUntil: "domcontentloaded" }),
      3
    );

    // Wait for a short random delay to mimic human interaction
    await page.waitForTimeout(Math.random() * 2000 + 1000); // Random delay between 1-3 seconds

    // Check if body is fully loaded before interacting with content
    await retryUntilSuccess(
      () => page.waitForSelector("body", { timeout: 60000 }),
      2
    );

    // Scroll the page slightly to trigger any lazy-loaded content
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(2000); // Wait after scrolling

    // Check if the "About the Job" section exists
    const selectorExists = await page.$(".show-more-less-html__markup");
    if (!selectorExists) {
      throw new Error("Selector .show-more-less-html__markup not found");
    }

    // Retry to wait for the "About the Job" section
    await retryUntilSuccess(
      () =>
        page.waitForSelector(".show-more-less-html__markup", {
          timeout: 60000,
        }),
      3
    );

    // Extract the "About the Job" section text
    const aboutJobText = await page.textContent(".show-more-less-html__markup");

    return aboutJobText;
  } catch (error) {
    // Catch and log any errors for debugging
    console.error("Error extracting job details:", error.message);
    throw error;
  } finally {
    // Ensure the browser is closed after the operation
    await browser.close();
  }
}
