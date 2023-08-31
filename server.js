const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const dbName = "Halloween";
const collectionName = "GuestInfo";

app.use(express.static("public")); // Serve static files from the "public" directory

app.post("/submit-guest", async (req, res) => {
  const { firstName, lastName, numOfGuests } = req.body;

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newGuest = {
      firstName: firstName,
      lastName: lastName,
      numOfGuests: numOfGuests,
    };

    const result = await collection.insertOne(newGuest);
    console.log("Document inserted with _id:", result.insertedId);

    res.json({ message: "Guest information submitted successfully." });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});