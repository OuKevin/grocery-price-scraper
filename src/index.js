/* eslint-disable global-require */
import puppeteer from 'puppeteer';
import config from './utils/config';
import login from './login';
import scrapePrices from './scrapePrices';
import savePrices from './savePrices';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') { require('dotenv').config(); }

const main = async () => {
  let browser = null;

  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: NODE_ENV === 'production' });

    const [page] = await browser.pages();
    config.page = page;
    await login();
    const itemPrices = await scrapePrices();
    await savePrices(itemPrices);
  } catch (error) {
    console.log(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  console.log('Finished Scraping Prices');
};

main();

export default main;
