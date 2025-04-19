// const express = require('express')
// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv')
// const bodyparser = require('body-parser')
// const cors = require('cors')
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// dotenv.config();

// // Connection URL
// // const url = 'mongodb://localhost:27017'; //mongo compass
// const url = process.env.MONGODB_URI; //mongo atlas
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'SafePass';
// const app = express()
// // const port = 3000
// const port = process.env.PORT || 3000


// app.use(bodyparser.json())
// app.use(cors())

// client.connect();

// // getting all the passwords
// app.get('/', async (req, res) => {
//     const db = client.db(dbName);
//     const collection = db.collection('passwords')
//     const findResult = await collection.find({}).toArray();
//     res.json(findResult)
// })

// // saving all the passwords
// app.post('/', async (req, res) => {
//     const password = req.body;
//     const db = client.db(dbName);
//     const collection = db.collection('passwords')
//     const findResult = await collection.insertOne(password);
//     res.send({success : true , result : findResult})
// })

// // dlete the pass
// app.delete('/', async (req, res) => {
//     const password = req.body;
//     const db = client.db(dbName);
//     const collection = db.collection('passwords')
//     const findResult = await collection.deleteOne(password);
//     res.send({success : true , result : findResult})
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`)
// }) 






const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config();

// Connection URL
const url = process.env.MONGODB_URI; // Mongo Atlas URL
const client = new MongoClient(url);

// Database Name
const dbName = 'SafePass';
const app = express();
const port = process.env.PORT || 3000;

// CORS setup - restrict to your frontend URL
const allowedOrigins = ['https://password-manager-mongo.vercel.app'];  // Your Vercel frontend URL
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(bodyparser.json());
app.use(cors(corsOptions));  // Apply CORS with the restricted origins

// Connect to MongoDB
client.connect();

// GET all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// POST a new password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

// DELETE a password
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
