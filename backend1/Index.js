const mongoose = require('mongoose');
const express = require('express');
const UserRouter = require('./Controller/UserControl');
const connectDB = require('./Database/db');
const env = require('dotenv').config();

const port = process.env.PORT;
const url = process.env.db_url;
const app = express();

app.use(express.json());
app.use('/api',UserRouter);

app.listen(port, async()=>{
    try{
        await connectDB(url);
        console.log(`port is running at http://localhost:${port}}`);
    }
    catch(err){
        console.log("there was an error connecting to the database",err);
    }
})