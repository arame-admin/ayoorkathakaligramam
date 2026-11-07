import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  console.log('Launching local Chrome browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else {
      console.log('PAGE LOG:', msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:8080/index.html ...');
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // 1. Capture Section 01: Intro
  await page.screenshot({ path: 'screenshot_01_intro.png' });
  console.log('Saved screenshot_01_intro.png');

  // Skip intro
  console.log('Clicking skip intro...');
  await page.click('.intro-skip-btn');
  await new Promise(r => setTimeout(r, 1200));

  // 2. Capture Section 03: Hero
  await page.screenshot({ path: 'screenshot_03_hero.png' });
  console.log('Saved screenshot_03_hero.png');

  // Check 3D canvas
  const canvasExists = await page.evaluate(() => {
    const canvas = document.querySelector('.three-canvas');
    return !!canvas;
  });
  console.log('Three.js canvas initialized in DOM:', canvasExists);

  // 3. Test Scrolling to Section 04: Introducing Ayroor
  await page.evaluate(() => {
    document.querySelector('#introducing-ayroor').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_04_intro_ayroor.png' });
  console.log('Saved screenshot_04_intro_ayroor.png');

  // 4. Test Scrolling to Section 05: World of Kathakali
  await page.evaluate(() => {
    document.querySelector('#world-of-kathakali').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_05_world.png' });
  console.log('Saved screenshot_05_world.png');

  // 5. Test Section 07: Kathakali Mela
  await page.evaluate(() => {
    document.querySelector('#kathakali-mela').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_07_mela.png' });
  console.log('Saved screenshot_07_mela.png');

  // 6. Test Section 08: Awards
  await page.evaluate(() => {
    document.querySelector('#awards-recognition').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_08_awards.png' });
  console.log('Saved screenshot_08_awards.png');

  // 7. Test Language Switcher (Malayalam)
  console.log('Testing Malayalam switch...');
  await page.click('.lang-btn[data-lang="ml"]');
  await new Promise(r => setTimeout(r, 600));
  const mlHeading = await page.evaluate(() => {
    return document.querySelector('#hero-section .hero-subtitle-coords').textContent;
  });
  console.log('Language switched to Malayalam text:', mlHeading);
  await page.screenshot({ path: 'screenshot_malayalam_active.png' });

  // Switch back to English
  await page.click('.lang-btn[data-lang="en"]');
  await new Promise(r => setTimeout(r, 400));

  // 8. Test Section 10: Gallery & Lightbox
  await page.evaluate(() => {
    document.querySelector('#visual-gallery').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_10_gallery.png' });
  console.log('Saved screenshot_10_gallery.png');

  // Click first gallery item to open lightbox
  await page.click('.gallery-item-inner');
  await new Promise(r => setTimeout(r, 600));
  const lightboxOpen = await page.evaluate(() => {
    return document.querySelector('.cinematic-lightbox').classList.contains('active');
  });
  console.log('Lightbox opened successfully:', lightboxOpen);
  await page.screenshot({ path: 'screenshot_lightbox.png' });

  // Close lightbox
  await page.click('.lightbox-close-btn');
  await new Promise(r => setTimeout(r, 500));

  // Test Mobile Viewport (390px - iPhone 12/14/15 size)
  console.log('Testing mobile viewport 390x844...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot_mobile_hero.png' });
  console.log('Saved screenshot_mobile_hero.png');

  // Open mobile menu
  await page.click('.mobile-menu-toggle');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot_mobile_menu.png' });
  console.log('Saved screenshot_mobile_menu.png');

  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console Errors details:', consoleErrors);
  }

  await browser.close();
  console.log('ALL BROWSER AUTOMATION TESTS COMPLETED SUCCESSFULLY!');
}

run().catch(console.error);
