import app from "../app";
import request from "supertest";

import { createTable } from "../models/catModel";

beforeAll(async () => {
  await createTable();
});

describe("Tests suite for Cats", () => {
  test("Create new cat", async () => {
    const response = await request(app).post("/cat").send({ name: "Mavis" });
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("New cat created");
  });

  test("Get all cats", async () => {
    const response = await request(app).get("/cat");
    expect(response.statusCode).toBe(200);
  });
});
