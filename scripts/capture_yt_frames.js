import puppeteer from 'puppeteer-core';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080 });
    await page.goto('https://www.youtube.com/shorts/sYGsqFtojDc', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    
    // Play video
    await page.evaluate(() => {
      const v = document.querySelector('video');
      if (v) {
        v.muted = true;
        v.play();
      }
    });

    for (let i = 1; i <= 6; i++) {
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: `yt_frame_${i}.png` });
      console.log(`Captured frame ${i}`);
    }

    await browser.close();
  } catch (e) {
    console.error('Error:', e);
  }
})();
