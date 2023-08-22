const { DynamoDBClient } = require('aws-sdk/client-dynamodb');
const client = new DynamoDBClient({
    region: 'eu-north-1',
    accessKeyId: 'AKIA5JZFLRNXG3PZGOLI',
    secretAccessKeyId: 'pxRPmVrTDOIsx0gr7TMJ0jUzikUUP2t5yaclytYG',
    endpoint: "https://localhost:8000"
})

module.exports = client;