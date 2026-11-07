import puppeteer from 'puppeteer-core';

async function checkConsole() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Users\\tkasw\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle']
  });

  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.log('[BROWSER UNCAUGHT ERROR]:', err);
  });

  page.on('requestfailed', req => {
    console.log('[FAILED REQUEST]:', req.url(), req.failure().errorText);
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      console.log(`[HTTP ${res.status()}]:`, res.url());
    }
  });

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  await browser.close();
}

checkConsole();
