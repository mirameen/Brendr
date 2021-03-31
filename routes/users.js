var express = require('express');
var router = express.Router();
var passport=require("passport");
var User = require("../models/User")

/* GET users listing. */
router.post('/register', function(req, res) {
    var user = new User({
      firstname: req.body.firstname,
      lastname : req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      username: req.body.username,
    })
    User.register(user,req.body.password, (err,resp) => {
      if(err) {
        res.json({success: false,message : err});
        console.log(err)
      } else {
        res.json({success: true});
        console.log(user)
      }
    });
});

router.post('/login',function(req,res) {
  if (!req.body.username) { 
    res.json({success: false, message: "Username was not given"}) 
  } else { 
    if (!req.body.password) { 
      res.json({success: false, message: "Password was not given"}) 
    } else { 
      passport.authenticate('local', function (err, user, info) {  
         if (err) { 
           res.json({success: false, message: err}) 
         } else { 
          if (!user) { 
            res.json({success: false, message: 'username or password incorrect'}) 
          } else { 
            req.login(user, function(err){ 
              if (err) { 
                res.json({success: false, message: err}) 
              } else { 
                res.json({success:true, message:"Authentication  successful", user: user }); 
                console.log(user)
              } 
            }) 
          } 
         } 
      }) (req, res); 
    } 
  } 
});

module.exports = router;
