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





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vigvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const productcollection = client.db("red-onion").collection("products");

app.get("/getproductbycategory",(req,res) => {
  const category  =req.query.category
  productcollection.find({}).limit(6)
  .toArray((err,documents) => {
    res.send(documents)
  })
})


app.get("/getproductbyid",(req,res) => {
  productcollection.find({id: req.query.id})
  .toArray((err,documents) => {
    res.send(documents[0])
  })
})

console.log("db connected");

});

  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})