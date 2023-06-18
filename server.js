const express = require('express');
const app = express();
const path = require('path'); // Import the 'path' module

// Serve the static build files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client/build')));

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const connectionString = process.env.DB_STRING;

MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to database');
    const db = client.db('fake-shop');
    const productsCollection = db.collection('products');
    
    // CRUD requests

    // Add a catch-all route to serve the React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  })
  .catch(error => console.log(error));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});