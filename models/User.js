var mongoose=require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname:  {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String, required: true},
    admin: Boolean,
    itemHistory: [{ type: mongoose.Schema.ObjectId, ref: 'Item'}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);