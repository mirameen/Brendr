var express = require('express');
var router = express.Router();
var Item = require("../models/Item")
var User = require("../models/User")
var Request= require("../models/Request")
var Conflict=require("../models/Conflict")

router.get('/', (req, res, next) => {
  Conflict
    .find({})
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

   var request2 = await Request.findOne({$and : [{receiveUserID:request.sendUserID}, {itemID : request.itemID}]});
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

async function resolveConflict(req, res) {
  var request = await Request.findOne({ "_id": req.body.requestID });
  if (request === null) {
    console.log('Request not found.');
  }
   else{

    request.conflictStatus="Resolved";
    request= await request.save().catch(err => console.log(err));

   }

   var request2 = await Request.findOne({$and : [{receiveUserID:request.sendUserID}, {itemID : request.itemID}]});
  if (request2 === null) {
    console.log('Request not found.');
  }
   else{

    request2.conflictStatus="Resolved";
    request2= await request2.save().catch(err => console.log(err));

   }

   var conflict = await Conflict.findOne({ "_id": req.body.conflictID });
   if (conflict === null) {
     console.log('Conflict not found.');
   }
    else{
 
     conflict.adminComment=req.body.comment;
     conflict.resolved=true;
     conflict.save().then(conflict => {
      res.json({ success: true, conflict: conflict });
    }, err => {
      console.log(err);
    });
 
    }
    
    
}

router.post('/resolve', (req, res, next) => resolveConflict(req, res));


async function getComment(req, res) {
  var request = await Request.findOne({$and : [{receiveUserID:req.body.sendUserID}, {itemID : req.body.itemID}]});
  var request2 = await Request.findOne({$and : [{receiveUserID:req.body.receiveUserID}, {itemID : req.body.itemID}]});
  console.log(request);
  console.log(request2);
  var conflict = await Conflict.findOne({ "requestID": request._id })
  var conflict2 = await Conflict.findOne({ "requestID": request2._id })
  console.log(conflict);
  console.log(conflict2);
  if(conflict)
  {
    res.json({ success: true, comment: conflict.adminComment });
  }
  if(conflict2)
  {
    res.json({ success: true, comment: conflict2.adminComment });
  }
  
}

router.post('/comment', (req, res, next) => getComment(req, res));

module.exports = router