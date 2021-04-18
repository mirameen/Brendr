var mongoose=require("mongoose");

var RequestSchema = new mongoose.Schema({
    requestType : Boolean,
    itemID : { type: mongoose.Schema.ObjectId, ref: 'Item' },
    sendUserID : { type: mongoose.Schema.ObjectId, ref: 'User' },
    receiveUserID : { type: mongoose.Schema.ObjectId, ref: 'User' },
    status : String,
    conflictStatus: String
});

module.exports = mongoose.model("Request",RequestSchema);