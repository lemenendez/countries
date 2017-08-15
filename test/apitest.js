var assert = require('assert');
var controller = require('../routes/api-v1')
  , http_mocks = require('node-mocks-http')
  , should = require('should')
var CountryModel = require('../models/countries');

// CountryModel.doFixtures();  // only for testing

var CountryId = 1;
var LocationId = null;
var version = "v1";
var prefix = "/api-v1/";    // unique prefix

function buildResponse() 
{
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
}

describe('Countries API V1 Tests', function() 
{
  before(function() {
     // runs before all tests in this block
     CountryModel.doFixtures();  // only for testing
  });
  it('get countries', function(done) {
    var response = buildResponse()
    var request  = http_mocks.createRequest({
      method: 'GET',
      url: prefix+"countries",
    })

    response.on('end', function() {
        var countries = JSON.parse(response._getData());
        console.log(countries.length);
        assert.equal(countries.length,5);      
      done()
    })

    controller.handle(request, response)
  });

  it('get country by id', function(done) {
    var response = buildResponse()
    var request  = http_mocks.createRequest({
      method: 'GET',
      url: prefix+"countries/1",
    })

    response.on('end', function() {
        var countries = JSON.parse(response._getData());
        assert.equal(countries.length,1);
        assert.equal("Guatemala", countries[0].Name);              
      done()
    })

    controller.handle(request, response)
  });

  it('post new country', function(done) 
  {
    var response = buildResponse();    
    var request  = http_mocks.createRequest({
      method: 'POST',      
      url: prefix+"countries",
    });

    request.body = {
        Name:"Gondor",
        ISO2LET: "GN",
        ISO3LET: "GNR",
        ISONUM: 110
    };

    response.on('end', function() {
        var result = JSON.parse(response._getData());
        assert.equal(result.status,"ok");
        assert.equal(result.desc,"Country successfuly created");
        assert.equal(result.affectedRows,1);
        CountryId = result.rowid;
      done()
    })

    controller.handle(request, response)
  });

  it('update a country', function(done) 
  {
    var response = buildResponse();    
    var request  = http_mocks.createRequest({
      method: 'POST',      
      url: prefix + "countries/" + CountryId,
    });

    request.body = {
        Name:"GONDOR",
        ISO2LET: "GN",
        ISO3LET: "GNO",
        ISONUM: 111
    };

    response.on('end', function() {
        var result = JSON.parse(response._getData());
        assert.equal(result.status,"ok");
        assert.equal(result.desc,"Country successfuly updated");
        assert.equal(result.affectedRows,1);
      done()
    })

    controller.handle(request, response)
  });

it('soft-delete a country', function(done) 
  {
    var response = buildResponse();    
    var request  = http_mocks.createRequest({
      method: 'DELETE',      
      url: prefix + "countries/" + CountryId,
    });

    response.on('end', function() {
        var result = JSON.parse(response._getData());
        assert.equal(result.status,"ok");
        assert.equal(result.desc,"Country successfuly soft-deleted");
        assert.equal(result.affectedRows,1);
      done()
    })

    controller.handle(request, response)
  });

it('creates a location', function(done) {
    var response = buildResponse()
    var request  = http_mocks.createRequest({
      method: 'POST',
      url: prefix+"countries/1/locs",
    });

    request.body = {
        Name:"Guatemala",
        Code: "GT"        
    };

    response.on('end', function() {
        var result = JSON.parse(response._getData());
        // console.log(response._getData());        
        assert.equal(result.status,"ok");
        assert.equal(result.desc,"Location successfuly created");
        assert.equal(result.affectedRows,1);
        LocationId = result.rowid;              
        done();
    })

    controller.handle(request, response)
  });  

it('get locations by countryid', function(done) {
    var response = buildResponse()
    var request  = http_mocks.createRequest({
      method: 'GET',
      url: prefix+"countries/1/locs",
    })

    response.on('end', function() {
        var locations = JSON.parse(response._getData());
        // console.log(response._getData());        
        assert.equal(locations.length,1);      
      done();
    })

    controller.handle(request, response)
  });
  
it('get locations by IDs', function(done) {
    var response = buildResponse()
    var request  = http_mocks.createRequest({
      method: 'GET',
      url: prefix + "countries/1/locs/" + LocationId,
    });

    response.on('end', function() {
        var locations = JSON.parse(response._getData());
        // console.log(response._getData());        
        assert.equal(locations.length,1);      
      done();
    })

    controller.handle(request, response)
  });

 it('it modifies a location', function(done) {
    var response = buildResponse()
    var request  = http_mocks.createRequest({
      method: 'POST',
      url: prefix+"countries/1/locs/"+LocationId,
    });

    request.body = {
        Name:"GUATEMALA",
        Code: "GT"        
    };

    response.on('end', function() {
        var result = JSON.parse(response._getData());
        // console.log(response._getData());        
        assert.equal(result.status,"ok");
        assert.equal(result.desc,"Location successfuly updated");
        assert.equal(result.affectedRows,1);                      
        done();
    })

    controller.handle(request, response)
  });  

 it('soft-delete a location', function(done) 
 {
    var response = buildResponse();    
    var request  = http_mocks.createRequest({
      method: 'DELETE',      
      url: prefix + "countries/" + CountryId + "/locs/" + LocationId
    });
    //console.log(request);
    response.on('end', function() {
        var result = JSON.parse(response._getData());
        assert.equal(result.status,"ok");
        assert.equal(result.desc,"Location successfuly soft-deleted");
        assert.equal(result.affectedRows,1);
      done()
    })

    controller.handle(request, response)
  });

});

/*describe('GET '+prefix+"countries", function() {
        it('returns a list of counries', function(done) {
            request.get('/tasks'+prefix+"countries")
                .expect(5)
                .end(function(err, res) {
                    expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
        });
});*/
