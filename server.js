const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route to test the connection
app.get('/', (req, res) => {
  res.send('Hello, MongoDB is connected!');
});

// Sample route to perform a query
app.get('/data', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('your_collection_name');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
