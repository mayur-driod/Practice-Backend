const {connect} = require('mongoose');

const connectDB = async (url) => {
    try {
        await connect(url);
        console.log("connected to the database successfully");
    } catch (err) {
        console.error("An error occured connecting to database", err);
    }
}

module.exports = connectDB;