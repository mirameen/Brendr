var express = require('express');
var router = express.Router();
var Item = require("../models/Item")

router.get('/', function(req, res) {
    Item.find({},function(err,items){
        if(err) console.log(err);
        else res.send(items);
    });
});

router.post("/",async(req,res){

    //var name  = req.body.name;
    //var image = req.body.image;
    //var desc  = req.body.description;
    //var inUse = req.body.inUse;
    const {name,image,desc,inUse}=req.body;   
    try{        
    var newItem = {
        name: name,
        image: image,
        description: desc,
        inUse: inUse,
    };
    console.log(newItem)
    var item = new Item(newItem);
    await item.save(function(err,newlyCreated) {
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
        return res.status(500).json(err);
    }

});

module.exports = router
