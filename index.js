const express = require('express')
const cors  =require('cors')
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config({path:'./config/.env'})

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.vigvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  


  console.log("db connected");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})