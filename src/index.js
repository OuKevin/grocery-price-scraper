/* eslint-disable global-require */
import chromium from 'chrome-aws-lambda';
import config from './utils/config';
import login from './login';
import scrapePrices from './scrapePrices';
import savePrices from './savePrices';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') { require('dotenv').config(); }

const main = async (event, context) => {
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    const [page] = await browser.pages();
    config.page = page;

    await login();
    const itemPrices = await scrapePrices();
    await savePrices(itemPrices);
  } catch (error) {
    return context.fail(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return context.succeed('Finished Scraping Prices');
};

if (NODE_ENV === 'development') { main(null, { fail: () => {}, succeed: () => {} }); }

export default main;
