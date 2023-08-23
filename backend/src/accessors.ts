import AWS from "aws-sdk";

class Addresses {
  private dynamodb: AWS.DynamoDB.DocumentClient;
  private tableName: string;

  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient({
      endpoint: "http://localhost:8000",
    });
    this.tableName = "Addresses";
  }

  async getall() {
    try {
      const params = {
        TableName: this.tableName,
      };
      const data = await this.dynamodb.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error("An error ocurred:", error);
      return {
        statusCode: 500,
        message: error,
      };
    }
  }

  async getOne(id: string) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          id: id,
        },
      };
      const data = await this.dynamodb.get(params).promise();
      if (data.Item) {
        return data.Item;
      } else {
        return "Not found";
      }
    } catch (error) {
      console.error("An error ocurred:", error);
      return {
        statusCode: 500,
        message: error,
      };
    }
  }

  async addOne(item: any) {
    try {
      item.id = Date.now().toString();
      const params = {
        TableName: this.tableName,
        Item: item,
      };
      await this.dynamodb.put(params).promise();
      return { message: "Item added" };
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        statusCode: 500,
        message: error,
      };
    }
  }

  async updateOne(id: string, item: any) {
    try {
      delete item.id;
      const expressionAttributeValues: any = {};
      const expressionAttributeNames: any = {};

      for (const key in item) {
        const expressionAttributeName = `#${key}`;
        expressionAttributeNames[expressionAttributeName] = key;
        expressionAttributeValues[`:${key}`] = item[key];
      }

      const updateExpression = Object.keys(item)
        .map((key) => `#${key} = :${key}`)
        .join(", ");
      const params = {
        TableName: this.tableName,
        Key: {
          id: id,
        },
        UpdateExpression: `SET ${updateExpression}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      };
      await this.dynamodb.update(params).promise();
      return { message: "Item updated" };
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        statusCode: 500,
        message: error,
      };
    }
  }

  async deleteOne(id: string) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          id: id,
        },
      };
      await this.dynamodb.delete(params).promise();
      return { message: "Deleted" };
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        statusCode: 500,
        message: error,
      };
    }
  }
}

export default Addresses;
