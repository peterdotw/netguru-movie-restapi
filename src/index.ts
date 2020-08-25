import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes";

const port: number = 3000;

createConnection().then(async (_) => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use("/", routes);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
