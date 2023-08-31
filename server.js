const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "Halloween";
const collectionName = "GuestInfo";

// Middleware to parse JSON data
app.use(express.json());

app.post('/submit', async (req, res) => {
    const { firstName, lastName, numOfGuests } = req.body;

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const newGuest = {
            firstName: firstName,
            lastName: lastName,
            numOfGuests: numOfGuests
        };

        const result = await collection.insertOne(newGuest);
        console.log("Document inserted with _id:", result.insertedId);

        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ message: 'Error inserting data' });
    } finally {
        await client.close();
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});