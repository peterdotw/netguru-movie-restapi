import request from "supertest";

import app from "../src/app";
import { setupTests } from "./utils/testUtilities";

describe("GET /comments", () => {
  setupTests();

  it("should return 200 OK", (done) => {
    request(app).get("/comments").expect(200, done);
  });

  it("should be empty array", (done) => {
    request(app).get("/comments").expect("[]", done);
  });
});

describe("POST /comments", async () => {
  setupTests();

  it("should return created", (done) => {
    request(app)
      .post("/movies")
      .set("Accept", "application/json")
      .send({ title: "Batman" })
      .end(() => {
        request(app)
          .post("/comments")
          .set("Accept", "application/json")
          .send({ comment: "I love this movie!", movie: "Batman" })
          .expect("Created")
          .expect(201, done);
      });
  });

  it("should return bad request because invalid data provided", (done) => {
    request(app)
      .post("/comments")
      .set("Accept", "application/json")
      .send({ error: "I hate this movie!" })
      .expect("Bad Request")
      .expect(400, done);
  });

  it("should return bad request because movie does not exist in database", (done) => {
    request(app)
      .post("/comments")
      .set("Accept", "application/json")
      .send({ title: "ExampleNotExistingMovie" })
      .expect("Bad Request")
      .expect(400, done);
  });

  it("should return bad request because validation fails", (done) => {
    request(app)
      .post("/movies")
      .set("Accept", "application/json")
      .send({ title: "Batman" })
      .end(() => {
        request(app)
          .post("/comments")
          .set("Accept", "application/json")
          .send({ comment: "x".repeat(1000), movie: "Batman" })
          .expect("Bad Request")
          .expect(400, done);
      });
  });
});
