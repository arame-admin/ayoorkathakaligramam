import puppeteer from 'puppeteer-core';

async function captureHero() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('[BROWSER ERROR]:', msg.text());
    }
  });

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Skip intro
  await page.click('.intro-skip-btn');
  await new Promise(r => setTimeout(r, 1500));

  // Capture desktop hero
  await page.screenshot({ path: 'screenshot_hero_new.png' });
  console.log('Saved screenshot_hero_new.png');

  // Test hovering to see cursor light effect and capture
  await page.mouse.move(720, 450);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'screenshot_hero_hover.png' });
  console.log('Saved screenshot_hero_hover.png');

  // Test Malayalam mode on hero
  await page.click('.lang-btn[data-lang="ml"]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshot_hero_malayalam.png' });
  console.log('Saved screenshot_hero_malayalam.png');

  // Test mobile hero at 390px
  await page.click('.lang-btn[data-lang="en"]');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshot_hero_mobile_new.png' });
  console.log('Saved screenshot_hero_mobile_new.png');

  await browser.close();
  console.log('Hero testing complete!');
}

captureHero().catch(console.error);
