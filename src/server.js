import express from "express";
import { chromium } from "playwright"; // Using Playwright for Chrome automation
import cors from "cors";

const app = express();
const PORT = 3001;

// LinkedIn credentials (replace with your credentials for testing purposes)
const linkedInEmail = "idorabin60@gmail.com";
const linkedInPassword = "idoidoido1";

// Endpoint to extract job details from a LinkedIn job URL
app.use(express.json());
app.use(cors());

// Function to log in to LinkedIn
async function loginToLinkedIn(page) {
  try {
    // Go to LinkedIn login page
    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "domcontentloaded", // Faster loading as we don't wait for full network to idle
    });

    // Check if the login page is displayed
    const isLoginPage = await page.$('input[name="session_key"]');

    if (isLoginPage) {
      console.log("Not logged in, logging in...");

      // Fill in email and password
      await page.type('input[name="session_key"]', linkedInEmail);
      await page.type('input[name="session_password"]', linkedInPassword);

      // Perform login
      await page.click('button[type="submit"]');

      // Wait for successful login indication
      await page.waitForTimeout(10000);

      console.log("Login successful.");
    } else {
      console.log("Already logged in.");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}

// Function to extract job details
async function extractJobDetails(page, jobURL) {
  try {
    console.log(`Navigating to the job URL: ${jobURL}`);

    // Navigate to the provided job URL
    await page.goto(jobURL, { waitUntil: "domcontentloaded", timeout: 60000 });
    console.log("blablalbsdfsdfs");

    await page.waitForTimeout(5000);
    // If there's a "See more" button, click it to reveal the full content
    await page.click('[data-test-icon="chevron-down-small"]');
    await page.waitForTimeout(5000);

    // Extract the text from the "About The Job" section
    const jobDetailsText = await page.$eval(
      "#job-details",
      (el) => el.textContent
    );
    // Extract the text content of the "About the job" section

    console.log("Job description extracted successfully.");
    return jobDetailsText;
  } catch (error) {
    console.error("Failed to extract job details:", error);
    throw new Error("Failed to extract job details");
  }
}

// Endpoint to handle POST requests for job detail extraction
app.post("/extract-job-details", async (req, res) => {
  const { jobURL } = req.body;

  if (!jobURL) {
    return res.status(400).send({ error: "Job URL is required" });
  }

  try {
    // Launch Chrome browser with Playwright
    const browser = await chromium.launch({
      headless: false, // Set to true for headless in production
      slowMo: 50, // Optional: slows down actions for easier debugging
    });
    const page = await browser.newPage();

    // Log in to LinkedIn
    await loginToLinkedIn(page);

    // Manually navigate to the provided job URL after login
    const aboutJobText = await extractJobDetails(page, jobURL);

    // Close the browser after extraction
    await browser.close();

    // Respond with the extracted job details
    res.json({ aboutJobText });
  } catch (error) {
    console.error("Error extracting job details:", error);
    res.status(500).json({ error: "Failed to extract job details" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
