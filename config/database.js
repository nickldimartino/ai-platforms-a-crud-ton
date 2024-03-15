// -------------------- Packages --------------------
const mongoose = require("mongoose");


// --------------- Connect to MongoDB ---------------
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;


// --------------- Connection Display ---------------
db.on("connected", () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}: ${db.port}`);
});
