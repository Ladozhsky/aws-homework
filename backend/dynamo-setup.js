import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'addresses',
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'name', AttributeType: 'S' },
    { AttributeName: 'city', AttributeType: 'S' },
    { AttributeName: 'street', AttributeType: 'S' },
    { AttributeName: 'house', AttributeType: 'N' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, // Настройте согласно вашим требованиям
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, (err, data) => {
  if (err) console.log('Error creating table:', err);
  else console.log('Table created successfully:', data);
});
