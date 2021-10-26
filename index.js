const express = require('express')
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const app = express()
const port = process.env.PORT || 2525
const cors = require('cors')
const ObjectId =


// Middle Ware
app.use(express.json())
app.use(cors())

const mongoUser = process.env.DB_USER
const mongoPass = process.env.DB_PASS

//  Mongo user_Pass = vjPQ1Bd1rLypNRQ7
//  Mongo user = topu9250

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.n33rv.mongodb.net/practices_db?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
// const client = new MongoClient(uri);




async function run() {
    
    try {
        await client.connect();
        const database = client.db('practices_db');
        const dataCollection = database.collection('practice');

        const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        };
        
        const result = dataCollection.insertOne(doc);

        app.get('/practice', async (req, res)=>{
            res.json(doc)
        })
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello my server World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})