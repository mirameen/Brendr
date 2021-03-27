var express = require('express');
var router = express.Router();
var Item = require("../models/Item")
var User = require("../models/User")

router.get('/', (req, res, next) => {
  Item
    .find({})
    .populate('userID')
    .then(items => res.send(items), err => console.log(err));
});

async function registerItem(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    console.log('User not found.');
  } else {
    var item = new Item({
      name: req.body.name,
      imageURL: req.body.imageURL,
      description: req.body.description,
      inUse: req.body.inUse,
      borrowlend: req.body.borrowlend,
      userID: user
    });
    item = await item.save().catch(err => console.log(err));
    user.itemHistory.push(item);
    user.save().then(user => {
      res.json({ success: true, user: user });
    }, err => {
      console.log(err);
    });
  }
}

router.post('/register', (req, res, next) => registerItem(req, res));

module.exports = router

