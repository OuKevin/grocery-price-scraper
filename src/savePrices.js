import documentClient from './utils/documentClient';

export default async (items) => {
  if (items.length === 0) return;

  const timestamp = String(new Date().toISOString());
  const formattedItems = items.map((item) => ({
    PutRequest: {
      Item: {
        ...item,
        timestamp,
      },
    },
  }));

  await documentClient.batchWrite({
    RequestItems: {
      'grocery-prices': formattedItems,
    },
  }).promise();
};
