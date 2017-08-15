var express = require('express');
var router = express.Router();
var CountryModel = require('../models/countries');

router.get('/', function(req, res, next) 
{
   res.render('countries', { title: 'Country Demostration API v1'});
});

/*router.get('/:countryid', function(req, res, next) 
{
   res.render('country', { title: 'Country Demostration API v1', countryid: req.params.countryid});
});*/


module.exports = router;
