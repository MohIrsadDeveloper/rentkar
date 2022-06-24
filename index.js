const express = require("express");
const app = express();
const env = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require('mongodb');


const MongoClient = mongodb.MongoClient;
const mongoUri = `mongodb+srv://rentkar:rentkar@cluster0.1ksuf.mongodb.net/?retryWrites=true&w=majority`;
let db;

env.config();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send("Hello home page")
});


app.get('/login', (req,res) => {
    res.send("Hello login page")
});

app.get('/category', (req,res) => {
    db.collection("Category").find().toArray((err,result) => {
        if (err) {
            throw err;
        } else {
            res.send(result)
        }
    })
});

app.get('/trending', (req,res) => {
    db.collection("Trending").find().toArray((err,result) => {
        if (err) {
            throw err;
        } else {
            res.send(result)
        }
    })
});

MongoClient.connect(mongoUri, (err,client) => {
    if (err) {
        console.log("Error While Connection " + err);
    } else {
        db = client.db("Rentkar");
        console.log("Database Connected...");
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`);
})