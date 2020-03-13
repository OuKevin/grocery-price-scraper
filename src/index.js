/* eslint-disable global-require */
import puppeteer from 'puppeteer';
import config from './utils/config';
import fetchItems from './fetchItems';
import login from './login';
import savePrices from './savePrices';
import scrapePrices from './scrapePrices';

const { IS_CRON, NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';
if (isDevelopment) { require('dotenv').config(); }

const main = async () => {
  let browser = null;
  console.log('is cron value', IS_CRON);

  try {
    const { Items } = await fetchItems();

    browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: NODE_ENV === 'production' });

    const [page] = await browser.pages();
    config.page = page;
    await login();
    const itemPrices = await scrapePrices(Items);
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

if (isDevelopment || IS_CRON) { main(); }

export default main;
