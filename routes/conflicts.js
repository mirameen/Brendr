var express = require('express');
var router = express.Router();
var Item = require("../models/Item")
var User = require("../models/User")
var Request= require("../models/Request")
var Conflict=require("../models/Conflict")

router.get('/', (req, res, next) => {
  Conflict
    .find()
    .then(conflicts => res.send(conflicts), err => console.log(err));
});

async function registerConflict(req, res) {
  var request = await Request.findOne({ "_id": req.body.requestID });
  if (request === null) {
    console.log('Request not found.');
  }
   else{

    request.conflictStatus="Raised";
    request= await request.save().catch(err => console.log(err));

   }

   var request2 = await Request.findOne({$and : [{sendUserID:request.sendUserID}, {itemID : request.itemID}]});
  if (request2 === null) {
    console.log('Request not found.');
  }
   else{

    request2.conflictStatus="Raised";
    request2= await request2.save().catch(err => console.log(err));

   }

    var conflict = new Conflict({
      title: req.body.title,
      description: req.body.description,
      requestID: req.body.requestID,
      resolved: false,
      adminComment:"NA"
    });
    
    conflict.save().then(conflict => {
      res.json({ success: true, conflict: conflict });
    }, err => {
      console.log(err);
    });
}

router.post('/register', (req, res, next) => registerConflict(req, res));

module.exports = router