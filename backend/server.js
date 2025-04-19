const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
// or as an es module:
// import { MongoClient } from 'mongodb'

dotenv.config();

// Connection URL
// const url = 'mongodb://localhost:27017'; //mongo compass
const url = process.env.MONGODB_URI; //mongo atlas
const client = new MongoClient(url);

// Database Name
const dbName = 'SafePass';
const app = express()
// const port = 3000
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(bodyparser.json())
app.use(cors())

client.connect();

// getting all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// saving all the passwords
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password);
    res.send({success : true , result : findResult})
})

// dlete the pass
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password);
    res.send({success : true , result : findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
}) 