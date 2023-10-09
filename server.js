const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const app = express();
app.use(bodyParser.json());

const dbName = "Halloween";
const collectionName = "GuestInfo";

app.use(cors({
  origin: 'http://localhost:5500',
}));

app.use(express.static("public"));

app.post("/submit-guest", async (req, res) => {
  const { firstName, lastName, numOfGuests } = req.body;
  console.log("REQ", req.body);
  console.log("FIRST", firstName);

  console.log("Received data:", firstName, lastName, numOfGuests);

  try {
    await client.connect();

    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newGuest = {
      firstName: firstName,
      lastName: lastName,
      numOfGuests: numOfGuests,
    };

    console.log("NEW GUEST:", newGuest.firstName, newGuest.lastName);

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
