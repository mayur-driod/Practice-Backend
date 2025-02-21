const {model , mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    "Task":{type:String , required:true},
    "Done":{type:Boolean , required:true},
    "Due":{type:Date, default: new Date("9999-12-31T23:59:59Z")},
    "Created":{type:Date , default: Date.now}
})

const TodoModel = model("Todo",TodoSchema);

module.exports = TodoModel;