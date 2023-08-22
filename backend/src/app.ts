import express from "express";
import serverless from "serverless-http";
import AWS from "aws-sdk";

import routes from "./routes";

const app = express();

const dbConfig: any = {
  region: "eu-north-1",
  endpoint: "http://localhost:8000",
};

AWS.config.update(dbConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.use("/", routes);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
  }
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).send();
  }
);

if (process.env.NODE_ENV !== 'production') {
    const PORT = 3003;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }

export const handler = serverless(app);
