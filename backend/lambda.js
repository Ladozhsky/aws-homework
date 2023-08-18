const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getUserAddresses() {
  const params = {
    TableName: 'addresses'
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  } catch (error) {
    throw new Error('Error fetching user addresses');
  }
}

exports.handler = async (event) => {
  try {
    const userAddresses = await getUserAddresses();

    return {
      statusCode: 200,
      body: JSON.stringify(userAddresses)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred' })
    };
  }
};
