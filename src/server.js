// server.js (Node.js backend)
const express = require("express");
const { chromium } = require("playwright");
const cors = require("cors"); // Enable CORS for cross-origin requests
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors()); // Allow CORS for development (optional, configure it as per your needs)

// Endpoint to extract job details from a LinkedIn job URL
app.post("/extract-job-details", async (req, res) => {
  const { jobURL } = req.body;

  if (!jobURL) {
    return res.status(400).send({ error: "Job URL is required" });
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(jobURL, { waitUntil: "networkidle" });
    await page.waitForSelector(".show-more-less-html__markup", {
      timeout: 60000,
    });
    const aboutJobText = await page.textContent(".show-more-less-html__markup");
    await browser.close();

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
