const express = require('express');
const Product = require('./models/product');

const app = express();
const path = require('path'); // Import the 'path' module

// Middleware to parse request bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const connectionString = process.env.DB_STRING;

MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to database');
    const db = client.db('fake-shop');
    const productsCollection = db.collection('products');
    
    // CRUD requests
    // Create a new product
    app.post('/products', async (req, res) => {
      const newProduct = req.body;
      console.log('newProduct:', newProduct);
    
      try {
        const result = await productsCollection.insertOne(newProduct);
        console.log('result:', result);
        res.status(201).json(newProduct);
      } catch (error) {
        console.log('Error adding product:', error);
        res.status(500).json({ error });
      }
    });
  })
  .catch(error => console.log(error));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
