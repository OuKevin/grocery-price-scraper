import config from './config';

export default async () => {
  const {
    ENDPOINT,
    EMAIL,
    PASSWORD,
  } = process.env;
  const { page } = config;

  await page.goto(ENDPOINT);
  await page.waitFor('input[name=email]');
  await page.waitFor('input[name=password]');

  await page.focus('input[name=email]');
  await page.keyboard.type(EMAIL);
  await page.focus('input[name=password]');
  await page.keyboard.type(PASSWORD);
  await page.click('button[type=submit]');
};
