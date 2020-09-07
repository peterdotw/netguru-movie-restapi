import request from "supertest";

import app from "../src/app";
import { setupTests, errorFixture } from "./utils/testUtilities";

describe("GET /movies", () => {
  setupTests();

  it("should return 200 OK", (done) => {
    request(app).get("/movies").expect(200, done);
  });

  it("should be empty array", (done) => {
    request(app).get("/movies").expect("[]", done);
  });
});

describe("POST /movies", () => {
  setupTests();

  it("should return created", (done) => {
    request(app)
      .post("/movies")
      .set("Accept", "application/json")
      .send({ title: "Batman" })
      .expect("Created")
      .expect(201, done);
  });

  it("should return bad request because movie already exists in database", (done) => {
    request(app)
      .post("/movies")
      .set("Accept", "application/json")
      .send({ title: "Catwoman" })
      .end(() => {
        request(app)
          .post("/movies")
          .set("Accept", "application/json")
          .send({ title: "Catwoman" })
          .expect(errorFixture(400, "Movie already exists in database."))
          .expect(400, done);
      });
  });

  it("should return bad request because invalid data provided", (done) => {
    request(app)
      .post("/movies")
      .set("Accept", "application/json")
      .send({ error: "Catman" })
      .expect(errorFixture(400, "Movie title required."))
      .expect(400, done);
  });

  it("should return bad request because movie does not exist in OmdbAPI", (done) => {
    request(app)
      .post("/movies")
      .set("Accept", "application/json")
      .send({ title: "ExampleNotExistingMovie" })
      .expect(errorFixture(400, "Movie not found in OmdbAPI."))
      .expect(400, done);
  });
});
