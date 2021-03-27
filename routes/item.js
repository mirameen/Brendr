var express = require('express');
var router = express.Router();
var Item = require("../models/Item")
var User = require("../models/User")

router.get('/', function(req, res, next) {
    Item.find({}).populate('userID').exec(function(err,items){
        if(err) console.log(err);
        else res.send(items);
    });
});

router.post("/register",function(req,res,next){

    var name  = req.body.name;
    var image = req.body.imageURL;
    var desc  = req.body.description;
    var inUse = req.body.inUse;
    var borrowlend=req.body.borrowlend;
    var useremail=req.body.email;
    User.findOne({ email: useremail }).
    exec(function (err, user) {
        if(err) {
            res.status(501);
            console.log(err);
        };
    var newItem = new Item({
        name: name,
        imageURL: image,
        description: desc,
        inUse: inUse,
        borrowlend: borrowlend,
        userID: user
    });
    newItem.save(function (err) {
        if(err) {
            res.status(501);
            console.log(err);
        }
        console.log('Item Saved '+ newItem);
        user.itemHistory.push(newItem);
        user.save(function(err){
            if(err) {
                res.status(501);
                console.log(err);
            }
        console.log('User database updated ' + user.email);
        res.json({ success: true, user: user });
        });
        
      });

  });
});

module.exports = router
