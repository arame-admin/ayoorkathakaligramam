import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
  
  // skip intro
  const skipBtn = await page.$('.intro-skip-btn');
  if (skipBtn) {
    await skipBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }

  const info = await page.evaluate(() => {
    const intro = document.querySelector('.hero-intro-header');
    const card = document.querySelector('#hero-portal-card');
    const hero = document.querySelector('#hero-section');
    const cin = document.querySelector('#cinematic-intro');
    const r1 = intro ? intro.getBoundingClientRect() : {};
    const r2 = card ? card.getBoundingClientRect() : {};
    return {
      heroDisplay: hero ? window.getComputedStyle(hero).display : null,
      intro: { top: r1.top, left: r1.left, width: r1.width, height: r1.height },
      introOpacity: intro ? window.getComputedStyle(intro).opacity : null,
      card: { top: r2.top, left: r2.left, width: r2.width, height: r2.height },
      cardOpacity: card ? window.getComputedStyle(card).opacity : null,
      cinematicIntroDisplay: cin ? window.getComputedStyle(cin).display : null
    };
  });
  console.log('DOM info:', JSON.stringify(info, null, 2));
  await browser.close();
})();
