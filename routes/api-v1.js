var express = require('express');
var router = express.Router();
var CountryModel = require('../models/countries');

exports.version = "v1";
exports.prefix = "/api-v1/";    // unique prefix
exports.description = "Country and locations api v1";

router.get(exports.prefix + "countries", function(req, res, next) {
  // res.render('index', { title: 'Express' });
  CountryModel.get(null, null, null, null, function(rows) {
      res.end (JSON.stringify(rows));
  });
});

router.post(exports.prefix + "countries", function(req, res, next) 
{
    var new_country = {
       Name:req.body.Name,
       ISO2LET: req.body.ISO2LET,
       ISO3LET: req.body.ISO3LET,
       ISONUM: req.body.ISONum
    };
            
    CountryModel.createCountry(new_country, function(result) 
    {
        res.end(JSON.stringify(result));
  });
});

router.get(exports.prefix +"countries/:countryid", function(req, res, next) {
  CountryModel.getCountryById(req.params.countryid, function(rows) {
      res.end (JSON.stringify(rows));
  });
});

router.post(exports.prefix +"countries/:countryid", function(req, res, next) {
  var country = {
       Name:req.body.Name,
       ISO2LET: req.body.ISO2LET,
       ISO3LET: req.body.ISO3LET,
       ISONUM: req.body.ISONum
    };  
  CountryModel.updateCountry(req.params.countryid, country, function(result) {
      res.end (JSON.stringify(result));
  });
});

router.delete(exports.prefix +"countries/:countryid", function(req, res, next) {  
  CountryModel.softDeleteCountry(req.params.countryid, function(result) {
      res.end (JSON.stringify(result));
  });
});

router.get(exports.prefix + "countries/:countryid/locs", function(req, res, next) {
  CountryModel.getLocs(req.params.countryid, function(result) {
      res.end (JSON.stringify(result));
  });
});

router.post(exports.prefix + "countries/:countryid/locs", function(req, res, next) {
  var location = {
       Name: req.body.Name,
       Code: req.body.Code,
       CountryId: req.params.countryid
    };  
  CountryModel.createLocation(location, function(result) {
      res.end (JSON.stringify(result));
  });  
});

router.post(exports.prefix + "countries/:countryid/locs/:locationid", function(req, res, next) {
  var location = {
       Name: req.body.Name,
       Code: req.body.Code       
    };  
  CountryModel.updateLocation(req.params.locationid, location, function(result) {
      res.end (JSON.stringify(result));
  });  
});

router.delete(exports.prefix + "countries/:countryid/locs/:locationid", function(req, res, next) {  
  CountryModel.softDeleteLocation(req.params.locationid, function(result) {
      res.end (JSON.stringify(result));
  });  
});

router.get(exports.prefix +"countries/:countryid/locs/:locationid", function(req, res, next) {
  CountryModel.getLocationByIds(req.params.countryid,req.params.locationid, function(rows) {
      res.end (JSON.stringify(rows));
  });
});

router.get(exports.prefix +"countries/:countryid/locs/:locationid", function(req, res, next) {
  CountryModel.getLocationByIds(req.params.countryid,req.params.locationid, function(rows) {
      res.end (JSON.stringify(rows));
  });
});

module.exports = router;
