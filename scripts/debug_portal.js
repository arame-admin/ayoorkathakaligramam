import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

  // Skip intro
  const skipBtn = await page.$('.intro-skip-btn');
  if (skipBtn) {
    await skipBtn.click();
    await new Promise(r => setTimeout(r, 1200));
  }

  const info = await page.evaluate(() => {
    const el = document.querySelector('.portal-card-outer');
    if (!el) return 'Element not found';
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const frame = el.querySelector('.portal-card-frame');
    const frameStyle = frame ? window.getComputedStyle(frame) : null;
    return {
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      opacity: style.opacity,
      display: style.display,
      visibility: style.visibility,
      zIndex: style.zIndex,
      frameWidth: frameStyle ? frameStyle.width : null,
      frameHeight: frameStyle ? frameStyle.height : null,
      frameOpacity: frameStyle ? frameStyle.opacity : null,
      outerHTML: el.outerHTML.substring(0, 300)
    };
  });

  console.log('PORTAL CARD INFO AT SCROLL=0:', info);
  await browser.close();
})();
