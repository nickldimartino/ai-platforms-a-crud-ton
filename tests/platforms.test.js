// ------------------------------ Packages ------------------------------
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const db = mongoose.connection;
const Platform = require("../models/platform");

require("dotenv").config();


// -------------------- Async Functions for Database --------------------
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


// ------------------------ Tests on /platforms -------------------------
describe("GET /platforms", () => {
    // test the route to get all AI Platforms from the database
    it("should return all platforms", async () => {
        // gets the response from the GET /platforms route
        const res = await request(app).get("/platforms");

        // checks if a connection was successful
        expect(res.statusCode).toBe(200);

        // saves all the AI Platforms in the database
        const platforms = await Platform.find({});

        // checks if the size of saved platforms is greater than 0
        expect(platforms.length).toBeGreaterThan(0);
    });

    // test variables for a temporary AI Platform
    const testId = "1234";
    let testName = "Mickey";

    // get all the platforms in the connected database
    const platforms = db.collection('platforms');

    // test the ability to add an AI Platform to the database
    it("should insert one platform", async () => {
        // create a mock AI Platform
        const mockPlatform = {_id: testId, name: testName};

        // add the mock AI Platform to the database
        const platform = await platforms.insertOne(mockPlatform);

        // get the added AI Platform from the database
        const insertedPlatform = await platforms.findOne({_id: testId});

        // check to see if the mock AI Platform was retrieved from the database
        expect(insertedPlatform).toEqual(mockPlatform);
    });

    it("should check if a platform is present in the database", async () => {
        // find the mock AI Platform that was added
        const findPlatform = await platforms.findOne({ _id: testId });

        // check to see if the added AI Platform was added
        expect(findPlatform).not.toBeNull();
    });

    it("should edit a platform in the database", async () => {
        // create a mock AI Platform
        const mockPlatform = {_id: "2345", name: testName};

        // insert the mock AI Platform
        const platform = await platforms.insertOne(mockPlatform);

        // edit the name of the inserted mock AI Platform
        platform.name = "Nick";

        // check to see if the mock AI Platform can be updated
        expect(platform.name).toBe("Nick");

        // remove the mock AI Platform from the database
        await platforms.findOneAndDelete({ _id: "2345" });
    })

    it("should remove a platform from the database", async () => {
        // find a mock AI Platform in the database and delete it
        await platforms.findOneAndDelete({ _id: testId });

        // find the mock AI Platform that was deleted
        const findPlatform = await platforms.findOne({ _id: testId });

        // check to see if the delete AI Platform was in the database
        expect(findPlatform).toBeNull();
    });
});