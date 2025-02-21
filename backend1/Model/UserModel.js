const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "Name": { type: String, required: true },
    "Email": { type: String, required: true, unique: true },
    "Organisation": { type: String, required: true },
    "Password" : {type:String, required:true , min:8}
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;