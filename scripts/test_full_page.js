import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

  // Scroll through the entire page
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total document height:', totalHeight);

  for (let y = 0; y <= totalHeight; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 100));
  }

  console.log('Finished scrolling. Errors count:', errors.length);
  if (errors.length > 0) {
    console.error('Errors encountered:', errors);
  } else {
    console.log('SUCCESS: Zero console or runtime errors across full page scroll!');
  }

  await browser.close();
})();
