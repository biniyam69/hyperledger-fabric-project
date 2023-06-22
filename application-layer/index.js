const express = require("express");
const bcrypt = require('bcrypt');
const { connect, client, collectionName } = require('./db');


const app = express();
const port = 3000;


app.use(express.json())

const saltFactor = 12; // Higher salt factor for increased security

// Register a new user
app.post('/register', async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash the password with the higher salt factor
    const hashedPassword = await bcrypt.hash(password, saltFactor);

    // Create a new user document
    const user = {
      username,
      password: hashedPassword,
      role,
    };

    // Insert the user document into the collection
    await collection.insertOne(user);

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred: ' + error.message);
  }
});


// Start the server
app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});