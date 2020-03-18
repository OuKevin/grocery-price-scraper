/* eslint-disable global-require */
import puppeteer from 'puppeteer';
import config from './utils/config';
import fetchItems from './fetchItems';
import login from './login';
import logger from './utils/logger';
import savePrices from './savePrices';
import scrapePrices from './scrapePrices';

const { IS_CRON, NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';
if (isDevelopment) { require('dotenv').config(); }

const main = async () => {
  let browser = null;
  logger.info('Starting up');
  try {
    const { Items } = await fetchItems();

    // TODO: move this to separate function
    browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: NODE_ENV === 'production' });

    const [page] = await browser.pages();
    config.page = page;
    await login();
    const itemPrices = await scrapePrices(Items);
    await savePrices(itemPrices);
  } catch (error) {
    logger.error(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  logger.info('Finished Scraping Prices');
};

if (isDevelopment || IS_CRON) { main(); }

export default main;
