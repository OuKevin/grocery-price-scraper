import AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

export default documentClient;
