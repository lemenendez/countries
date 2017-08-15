var assert = require('assert');
var CountryModel = require('../models/countries');
// var sleep = require('sleep');

var CountryId = 1;
var LocationId = null;

describe('#Test Buiness Objects Layer', function() 
{
    before(function() {
        // runs before all tests in this block
        CountryModel.doFixtures();  // only for testing
    });

    it('should get countries without  errors', function(done) {
        CountryModel.get(null, null, null, null, function(rows) {
            done();
        });
    });

    it('should get CountryById without errors', function(done) {
        CountryModel.getCountryById(1, function(rows) {
            done();
        });
    });

    it('should get CountryById without errors', function(done) {
            CountryModel.getCountryById(1, function(rows) {
            done();
        });
    });

    it('should create a country without errors', function(done) {
        var new_country = {
            Name:"Narnia",
            ISO2LET: "NN",
            ISO3LET: "NAR",
            ISONUM: 109
        };
    
        CountryModel.createCountry(new_country, function(result) {
            done();
        });
    });            

    it('should update a country without errors', function(done) {
        var country = {
            Name:"GUATEMALA"
        };
        
        CountryModel.updateCountry(1, country, function(rows) {
            done();
        });
    });  

    it('should update a country without errors', function(done) {            
        CountryModel.softDeleteCountry(2, function(rows) {
            done();
        });
    });

    it('should create a location without errors', function(done) {
        var new_location = {
            Name:"Guatemala",
            Code: "GT",
            CountryId: 1
        };
    
        CountryModel.createLocation(new_location, function(result) {
            LocationId = result.rowid;
            assert.equal(result.status, "ok");
            done();
        });
    });

    it('should get locations without errors', function(done) {                         
        CountryModel.getLocs(1, function(rows) {
            assert.equal(rows.length,1);
            done();
        });
    });

    it('should update a location without errors', function(done) {
            var location = {
                Name:"GUATEMALA"
            };
            
            CountryModel.updateLocation(LocationId, location, function(rows) {
                done();
            });
    });

    it('should soft delete a location without errors', function(done) {            
        CountryModel.softDeleteLocation(LocationId, function(rows) {
            done();
        });
    });
    
    it('should get a location without errors', function(done) {            
        CountryModel.getLocationByIds(1,LocationId, function(rows) {
            done();
        });
    });
});
