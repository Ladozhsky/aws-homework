import { Request, Response, Router } from "express";

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localhost:8000",
});

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const params = {
      TableName: "Addresses",
    };
    const data = await dynamodb.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const params = {
      TableName: "Addresses",
      Key: {
        id: id,
      },
    };
    const data = await dynamodb.get(params).promise();
    res.status(200).json(data.Item);
  } catch (error) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const address = req.body;
    address.id = Date.now().toString()
    console.log(address.id)
    console.log(address)
    const params = {
      TableName: "Addresses",
      Item: address,
    };
    const data = await dynamodb.put(params).promise();
    res.status(200).json(data.Item);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const address = req.body;
    const id = req.params.id;
    const params = {
        TableName: "Addresses",
        Key: {
          id: id,
        },
        Item: address
      };
    const data = await dynamodb.update(params).promise();
    res.status(200).json(data.Item);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const params = {
        TableName: "Addresses",
        Key: {
          id: id,
        },
      };
    await dynamodb.delete(params).promise();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json(error);
  }
});

export default router;
