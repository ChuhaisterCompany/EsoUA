require('dotenv').config();

const path = require('path');
const puppeteer = require('puppeteer');

let page;

const getElementByAttribute = async (name, value) => page.$(`[${name}="${value}"]`);

const clickEl = async (el) => {
  if (!el) {
    throw new Error('no Element found');
  }

  await el.click();
};

const fillInput = async (el, text) => {
  if (!el) {
    throw new Error('no Element found');
  }

  await el.click({ clickCount: 3 });
  await el.press('Backspace');
  await el.type(text);
};

const uploadZip = async (el, filename) => {
  if (!el) {
    throw new Error('no Element found');
  }

  await el.uploadFile(path.resolve(__dirname, filename));
};

(async () => {
  const browser = await puppeteer.launch();
  page = await browser.newPage();

  await page.goto('https://www.esoui.com/downloads/editfile.php?id=3437');

  await fillInput(
    await getElementByAttribute('name', 'vb_login_username'),
    process.env.ESOUI_USERNAME,
  );
  await fillInput(
    await getElementByAttribute('name', 'vb_login_password'),
    process.env.ESOUI_PASSWORD,
  );
  await clickEl(await getElementByAttribute('name', 'cookieuser'));
  await clickEl(await getElementByAttribute('type', 'submit'));

  await page.waitForNavigation();

  await uploadZip(await getElementByAttribute('name', 'replacementfile'), process.env.ZIP_NAME);
  await fillInput(await getElementByAttribute('name', 'version'), process.env.ESO_VERSION);
  await clickEl(await getElementByAttribute('name', 'docertify'));
  await clickEl(await getElementByAttribute('name', 'sbutton'));

  // await page.screenshot({ path: 'uploadAddOn.png', fullPage: true });

  await browser.close();
})();
