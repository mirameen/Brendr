var mongoose=require("mongoose");

var ItemSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    description: String,
    inUse: Boolean,
    borrowlend: Boolean,
    userID : { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Item",ItemSchema);