var express = require('express');
var router = express.Router();
var Item = require("../models/Item")

router.get('/', function(req, res, next) {
    Item.find({},function(err,items){
        if(err) console.log(err);
        else res.send(items);
    });
});

router.post("/",function(req,res,next){

    var name  = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;
    var inUse = req.body.inUse;
    
    var newItem = {
        name: name,
        image: image,
        description: desc,
        inUse: inUse,
    };
    console.log(newItem)
    var item = new Item(newItem);
    item.save(function(err,newlyCreated) {
        if(err) {
            res.status(501);
            console.log(err);
        }
        else {
            console.log(newlyCreated);
            res.send(newlyCreated);
        }
    });

});

module.exports = router
