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

    // Listen to console logs
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err));

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

    // Skip intro if visible
    const skipBtn = await page.$('.intro-skip-btn');
    if (skipBtn) {
      await skipBtn.click();
      await new Promise(r => setTimeout(r, 1200));
    }

    // Capture Initial Portal Hero
    await page.screenshot({ path: 'portal_01_initial.png' });
    console.log('Saved portal_01_initial.png');

    // Scroll down gradually
    await page.evaluate(() => {
      window.scrollTo({ top: 400, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'portal_02_expanding.png' });
    console.log('Saved portal_02_expanding.png');

    // Scroll down further to fully expanded manifesto
    await page.evaluate(() => {
      window.scrollTo({ top: 1200, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'portal_03_expanded_manifesto.png' });
    console.log('Saved portal_03_expanded_manifesto.png');

    // Switch to Malayalam
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    const mlBtn = await page.$('.lang-btn[data-lang="ml"]');
    if (mlBtn) {
      await mlBtn.click();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'portal_04_malayalam.png' });
      console.log('Saved portal_04_malayalam.png');
    }

    // Test Mobile viewport
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    // ensure intro is dismissed on mobile
    await page.evaluate(() => {
      const intro = document.querySelector('#cinematic-intro');
      if (intro) intro.style.display = 'none';
      document.body.classList.remove('intro-active');
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'portal_05_mobile.png' });
    console.log('Saved portal_05_mobile.png');

    await browser.close();
    console.log('All tests completed successfully!');
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
})();
