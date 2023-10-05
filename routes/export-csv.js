const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017/your-database-name';

router.get('/export-csv', async (req, res) => {
  try {
    // Create a MongoDB client
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true });

    // Connect to the MongoDB server
    await client.connect();

    // Access the "tests" collection
    const db = client.db();
    const collection = db.collection('tests');

    // Fetch all documents from the collection
    const documents = await collection.find({}).toArray();

    // Define CSV file options
    const csvWriter = createCsvWriter({
      path: 'tests.csv',
      header: [{ id: 'field1', title: 'Field 1' }, { id: 'field2', title: 'Field 2' }],
    });

    // Write the documents to the CSV file
    await csvWriter.writeRecords(documents);

    // Close the MongoDB connection
    client.close();

    // Send the CSV file as a download
    res.download('tests.csv', 'tests.csv', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error downloading CSV');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exporting data');
  }
});

module.exports = router;
