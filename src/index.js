import puppeteer from 'puppeteer';
import config from './utils/config';
import login from './login';
import scrapePrices from './scrapePrices';
import savePrices from './savePrices';

require('dotenv').config();

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const [page] = await browser.pages();
    config.page = page;

    await login();
    const itemPrices = await scrapePrices();
    await savePrices(itemPrices);
  } catch (error) {
    console.error(error);
  }
};

main();
