const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const db = mongoose.connection;

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /platforms", () => {
    it("should return all platforms", async () => {
        const res = await request(app).get("/platforms");
        expect(res.statusCode).toBe(200);
        //expect(res.body.length).toBeGreaterThan(0);
    });

    it("should insert one platform", async () => {
        // const platforms = db.collection("platforms");
        // const mockPlatform = { name: "Mickey" };
        // await platforms.insertOne(mockPlatform);
        // const insertedPlatform = await platforms.findOne({name: "Mickey"})
        // expect(insertedPlatform).toEqual(mockPlatform);
    })
});