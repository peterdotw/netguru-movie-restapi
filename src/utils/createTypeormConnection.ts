import { createConnection } from "typeorm";

export const createTypeormConnection = async () => {
  return createConnection("docker-db");
};
