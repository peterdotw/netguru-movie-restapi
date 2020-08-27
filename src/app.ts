import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes";

const app: Application = express();

createTypeormConnection().then(async (_) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use("/", routes);
});

export default app;
