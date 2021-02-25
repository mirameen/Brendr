var express = require('express');
var router = express.Router();
var Item = require("../models/Item")

router.get('/', function(req, res,) {
    Item.find({},function(err,items){
        if(err) console.log(err);
        else res.send(items);
    });
});

router.post("/",async(req,res)=>{

const{name,image,desc,inUse}=req.body;    
try{
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
}
catch(err){
    console.log(err);
}
});

module.exports = router
