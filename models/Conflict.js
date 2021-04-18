var mongoose=require("mongoose");

var ConflictSchema = new mongoose.Schema({
    title: String,
    description: String,
    requestID : { type: mongoose.Schema.ObjectId, ref: 'Request' },
    resolved: Boolean,
    adminComment: String
});

module.exports = mongoose.model("Conflict",ConflictSchema);