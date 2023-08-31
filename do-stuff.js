const { MongoClient } = require('mongodb');

require('dotenv').config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const dbName = "your-database-name";
const collectionName = "your-collection-name";

const guest = {
    firstName: String,
    lastName: String,
    numOfGuests: Number
};

var guestFirstName = document.getElementById("first-name");
var guestLastName = document.getElementById("last-name");
var guestAmount = document.getElementById("guests");

const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      input.parentElement.classList.remove('focused');
    }
  });
});

async function submitLogic() {
  const firstName = guestFirstName.value;
  const lastName = guestLastName.value;
  const numOfGuests = parseInt(guestAmount.value);

  try {
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Create a document to insert into the collection
      const newGuest = {
          firstName: firstName,
          lastName: lastName,
          numOfGuests: numOfGuests
      };

      // Insert the document into the collection
      const result = await collection.insertOne(newGuest);
      console.log("Document inserted with _id:", result.insertedId);
  } catch (error) {
      console.error("Error inserting document:", error);
  } finally {
      await client.close();
  }
}