import { createConnection } from "typeorm";

export const createTypeormConnection = async () => {
  return createConnection(process.env.IS_DOCKER ? "docker-db" : "default");
};
