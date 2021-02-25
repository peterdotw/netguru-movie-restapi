import { getConnectionOptions, createConnection, Connection } from "typeorm";

export const createTypeormConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(
    process.env.IS_DOCKER ? "docker-db" : "default"
  );
  console.log(connectionOptions);

  return createConnection({
    ...connectionOptions,
  });
};
