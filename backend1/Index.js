const mongoose = require('mongoose');
const express = require('express');

const connectDB = require('./Database/db');
const router = require('./Router/UserRoute');
const env = require('dotenv').config({path: './Config/.env'});

const port = process.env.PORT;
const url = process.env.db_url;
console.log(url)
const app = express();

app.use(express.json());
app.use('/api',router);

app.listen(port, async()=>{
    try{
        await connectDB(url);
        console.log(`port is running at http://localhost:${port}}`);
    }
    catch(err){
        console.log("there was an error connecting to the database",err);
    }
})