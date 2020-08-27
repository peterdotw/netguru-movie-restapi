import { createConnection, getConnection } from "typeorm";

export const setupTests = () => {
  before(async () => {
    await createConnection({
      type: "sqlite",
      database: "netguru_restapi_test.sqlite",
      entities: ["src/entities/**/*.ts"],
      synchronize: true,
      logging: false,
    });
  });

  after(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });
};
