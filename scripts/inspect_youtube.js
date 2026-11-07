import puppeteer from 'puppeteer-core';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.youtube.com/watch?v=sYGsqFtojDc', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 6000));
    const title = await page.title();
    console.log('PAGE TITLE:', title);

    const data = await page.evaluate(() => {
      const h1 = document.querySelector('h1.ytd-watch-metadata') || document.querySelector('h1');
      const text = h1 ? h1.innerText : '';
      const desc = document.querySelector('#description-inner') ? document.querySelector('#description-inner').innerText : '';
      return { text, desc };
    });
    console.log('VIDEO TITLE:', data.text);
    console.log('VIDEO DESC:', data.desc);

    await page.screenshot({ path: 'youtube_ref_shot.png' });
    console.log('Saved screenshot to youtube_ref_shot.png');
    await browser.close();
  } catch (e) {
    console.error('Error:', e);
  }
})();
