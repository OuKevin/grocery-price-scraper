const BASE_URL = 'https://shop.aldi.us';

export const loginEndpoint = `${BASE_URL}/#login`;
export const generateItemPageEndpoint = (itemId) => `${BASE_URL}/store/items/item_${itemId}`;
