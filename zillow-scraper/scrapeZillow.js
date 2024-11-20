const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch the Puppeteer browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the Zillow page for Manhattan
  const url = 'https://www.zillow.com/manhattan-new-york-ny/rentals/';
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Wait for listings to load
  await page.waitForSelector('.list-card');

  // Extract data from the page
  const listings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.list-card')).map((card) => {
      const title = card.querySelector('.list-card-heading a')?.innerText || 'No title';
      const price = card.querySelector('.list-card-price')?.innerText || 'No price';
      const address = card.querySelector('.list-card-addr')?.innerText || 'No address';
      const link = card.querySelector('.list-card-heading a')?.href || 'No link';
      return { title, price, address, link };
    });
  });

  console.log(`Scraped ${listings.length} listings`);

  // Save the data to a JSON file
  const filePath = 'listings.json';
  fs.writeFileSync(filePath, JSON.stringify(listings, null, 2));
  console.log(`Data saved to ${filePath}`);

  // Close the browser
  await browser.close();
})();
