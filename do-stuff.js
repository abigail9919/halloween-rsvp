const guest = {
    firstName: String,
    lastName: String,
    numOfGuests: Number
};

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

function submitLogic() {
    halloweenGuest = new guest();
    console.log(formInputs);
    // guest.firstName = formInputs.
}

// API stuff
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

const mongoURL = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
const dbName = 'your-database-name';
const client = new MongoClient(mongoURL);

app.use(express.json());

app.post('/addData', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('your-collection-name');

        const data = req.body; // Assuming your website sends JSON data

        // Insert data into the collection
        await collection.insertOne(data);

        res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
