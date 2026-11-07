import puppeteer from 'puppeteer-core';

async function testRemaining() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Skip intro
  await page.click('.intro-skip-btn');
  await new Promise(r => setTimeout(r, 1000));

  // Section 06: Cultural Heritage
  await page.evaluate(() => {
    document.querySelector('#cultural-heritage').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot_06_heritage.png' });

  // Section 09: YouTube Showcase
  await page.evaluate(() => {
    document.querySelector('#youtube-showcase').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot_09_youtube.png' });

  // Section 11: Final Cinematic Experience
  await page.evaluate(() => {
    document.querySelector('#final-cinematic').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot_11_final.png' });

  // Section 12: Footer
  await page.evaluate(() => {
    document.querySelector('.site-footer').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot_12_footer.png' });

  // Contact Modal
  await page.click('[data-open-contact]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshot_contact_modal.png' });

  await browser.close();
  console.log('Captured remaining section screenshots!');
}

testRemaining();
