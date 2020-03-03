import puppeteer from 'puppeteer';
import config from './utils/config';
import login from './login';
import scrapePrices from './scrapePrices';

require('dotenv').config();

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const [page] = await browser.pages();
    config.page = page;

    await login();
    await scrapePrices();
  } catch (error) {
    console.error(error);
  }
};

main();
