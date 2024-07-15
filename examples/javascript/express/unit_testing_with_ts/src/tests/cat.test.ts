import app from "../app"
import request from "supertest";

describe("Tests suite for Cats", () => {
    test("Get all cats", async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
})
