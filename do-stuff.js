
const uri = "mongodb+srv://ard99:f8H8rE8y1ZWkpVEL@cluster0.g1qly6d.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbName = "Halloween";
const collectionName = "GuestInfo";

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

const guest = {
    firstName: String,
    lastName: String,
    numOfGuests: Number
};

var guestFirstName = document.getElementById("first-name");
var guestLastName = document.getElementById("last-name");
var guestAmount = document.getElementById("guests");

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
  alert(firstName);

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