const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL

// Database and collection names
const dbName = 'admin'; // Replace with your database name
const collectionName = 'users'; // Replace with your collection name

// Connect to MongoDB
const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Export the client and collection
module.exports = {
  connect,
  client,
  collectionName,
};
