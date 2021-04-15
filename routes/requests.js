var express = require('express');
var router = express.Router();
var Item = require("../models/Item")
var Request = require("../models/Request")
var User = require("../models/User")

router.get('/:id', (req, res, next) => {
    Request
      .find({receiveUserID:req.params.id})
      .populate('sendUserID')
      .populate('receiveUserID')
      .populate('itemID')
      .then(requests => res.send(requests), err => console.log(err));
});

async function registerRequest(req, res) {
  const dupReq = await Request.findOne({$and : [{sendUserID:req.body.borrowReq.sendUserID}, {itemID : req.body.borrowReq.itemID}]});
  if(dupReq === null){
    var requestBorrow = new Request({
      requestType : req.body.borrowReq.requestType,
      itemID : req.body.borrowReq.itemID,
      sendUserID : req.body.borrowReq.sendUserID,
      receiveUserID : req.body.borrowReq.receiveUserID,
      status : req.body.borrowReq.status
    });
    requestBorrow = await requestBorrow.save().catch(err => console.log(err));

    var requestLend = new Request({
      requestType : req.body.lendReq.requestType,
      itemID : req.body.lendReq.itemID,
      sendUserID : req.body.lendReq.sendUserID,
      receiveUserID : req.body.lendReq.receiveUserID,
      status : req.body.lendReq.status
    });

    if(req.body.lendReq.status === "Accepted")
    {
      var itemRequested = await Item.findOne({"_id" : req.body.lendReq.itemID});
      itemRequested.inUse = false;
      itemRequested= await itemRequested.save().catch( err => console.log(err));
    }

    requestLend.save().then( (request) => {
      console.log(request);
      res.json({ success: true });
    }, err => {
      console.log(err)
    });
  } else {
    console.log(dupReq);
    res.json({ success: false });
  }
}

router.post('/register', (req, res, next) => registerRequest(req, res));

async function decisionRequest(req, res) {
  var borrowReq = await Request.findOne({$and : [{receiveUserID:req.body.receiveUserID}, {itemID : req.body.itemID}]});
  borrowReq.status = req.body.status;
  borrowReq = await borrowReq.save().catch( err => console.log(err));
  var lendReq = await Request.findOne({$and : [{receiveUserID:req.body.sendUserID}, {itemID : req.body.itemID}]});
  lendReq.status = req.body.status;
  console.log('borrow req done!');
  
  if(req.body.status === "Accepted")
  {
    var itemRequested = await Item.findOne({"_id" : req.body.itemID});
    itemRequested.inUse = false;
    itemRequested= await itemRequested.save().catch( err => console.log(err));
  }
  
  console.log('inuse false done!');
  lendReq = await lendReq.save().then( (request) => {
    console.log(request);
    console.log('lend req done!');
    res.json({ success: true });
  }, err => {
    console.log(err)
    res.json({success : false});
  });
  
}

router.post('/decision', (req, res, next) => decisionRequest(req, res));


module.exports = router