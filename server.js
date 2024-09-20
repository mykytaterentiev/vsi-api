const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route to test the connection
app.get('/', (req, res) => {
  res.send('Hello, MongoDB is connected!');
});

// Sample route to perform a query (GET request)
app.get('/data', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('vsiavto');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
});

// POST route to receive and handle form data
app.post('/car-parts', async (req, res) => {
  console.log('Received POST request with data:', req.body);
  
  try {
    const collection = mongoose.connection.db.collection('vsiavto');
    
    // Insert the received data into the collection
    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
