import config from './config';

export default (selectors) => Promise.race(
  selectors.map((selector) => config.page
    .waitForSelector(selector, {
      visible: true,
    })
    .then(() => selector)),
);
