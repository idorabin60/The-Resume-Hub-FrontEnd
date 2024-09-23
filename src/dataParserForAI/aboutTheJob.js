import { chromium } from "playwright";

export async function extractJobDetails(jobURL) {
  const browser = await chromium.launch({ headless: true }); // Run in headless mode (no browser window)
  const page = await browser.newPage();

  try {
    // Go to the LinkedIn job page
    await page.goto(jobURL, { waitUntil: "networkidle" }); // Wait for all network requests to finish

    // Wait for the "About the Job" section to be available, with an extended timeout
    await page.waitForSelector(".show-more-less-html__markup", {
      timeout: 60000,
    });

    // Extract the "About the Job" section text
    const aboutJobText = await page.textContent(".show-more-less-html__markup");

    // console.log("About the Job Section:");
    // console.log(aboutJobText);

    return aboutJobText; // Return the extracted text
  } catch (error) {
    console.error("Error extracting job details:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  } finally {
    await browser.close(); // Close the browser when done
  }
}
