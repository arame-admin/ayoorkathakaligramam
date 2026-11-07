import puppeteer from 'puppeteer-core';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err));

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

    // Skip intro safely
    await page.evaluate(() => {
      const intro = document.querySelector('#cinematic-intro');
      if (intro) intro.style.display = 'none';
      document.body.classList.remove('intro-active');
    });
    await new Promise(r => setTimeout(r, 1200));

    // 1. Initial Desktop Hero with Cutout
    await page.screenshot({ path: 'cutout_01_hero.png' });
    console.log('Saved cutout_01_hero.png');

    // 2. Scroll 500px to see cutout zoom
    await page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'cutout_02_scroll.png' });
    console.log('Saved cutout_02_scroll.png');

    // 3. Scroll 1200px to see full manifesto
    await page.evaluate(() => {
      window.scrollTo({ top: 1200, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'cutout_03_manifesto.png' });
    console.log('Saved cutout_03_manifesto.png');

    // 4. Test Malayalam
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const mlBtn = await page.$('.lang-btn[data-lang="ml"]');
    if (mlBtn) {
      await mlBtn.click();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cutout_04_malayalam.png' });
      console.log('Saved cutout_04_malayalam.png');
    }

    // 5. Test Mobile
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      const intro = document.querySelector('#cinematic-intro');
      if (intro) intro.style.display = 'none';
      document.body.classList.remove('intro-active');
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'cutout_05_mobile.png' });
    console.log('Saved cutout_05_mobile.png');

    await browser.close();
    console.log('Cutout testing complete!');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
