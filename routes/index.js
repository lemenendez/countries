var express = require('express');
var router = express.Router();
var user = require('../models/user')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Country Demostration API v1' });
});

router.post('/login', function(req, res, next) {     
  if (user.auth(req.body.username, req.body.password))
   {     
     // redirect to countries secured area     
     res.redirect('/countries');
   }
   else {
     res.render('index', { title: 'Country Demostration API v1', error: "login failed" });
   }
});

module.exports = router;
