var mysql = require('mysql');
var db = require('../models/db');

var countryModel = {};

var data = {
        tables:  [
            {
                name: "Country",             
                data: [
                    { CountryId: 1, Name:"Guatemala",ISO2LET:"GT",ISO3LET:"GMT", ISONUM: 320, IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At: "2017-7-21T13:28:06.419Z" },
                    { CountryId: 2, Name:"Spain",ISO2LET:"ES",ISO3LET:"ESP", ISONUM: 724, IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z" },
                    { CountryId: 3, Name:"Canada",ISO2LET:"CA",ISO3LET:"CAN", ISONUM: 124, IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z" },
                    { CountryId: 4, Name:"Mexico",ISO2LET:"MX",ISO3LET:"MEX", ISONUM: 484, IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z" },
                    { CountryId: 5, Name:"Brazil",ISO2LET:"BR",ISO3LET:"BRA", ISONUM: 076, IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z" }
                ],
                insert_order:1,
                delete_order:2
            },
            {
                name: "Location", 
                data: [
                    { LocationId: 1, CountryId: 1, Name:"Guatemala", Code: "GUA", IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z"},
                    { LocationId: 2, CountryId: 1, Name:"Escuintla", Code: "ESC", IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z"},
                    { LocationId: 3, CountryId: 1, Name:"Quetzaltenango", Code: "QTZ", IsActive: 1, Created_At:"2017-7-21T13:28:06.419Z", Updated_At:"2017-7-21T13:28:06.419Z"}
                ],
                insert_order: 2,
                delete_order:1
            }            
        ]
};

countryModel.deleteFixtures = function (done) 
{
    db.state.test = true;
    console.log("calling deletefixtures with test:" + db.state.test);
    if(db.state.test) 
    {       
        db.connect(db.state.test, function() 
        {       
            db.drop(data,done);
        });
    }
}

countryModel.startFixtures = function () 
{    
    db.state.test = true;
    db.connect(db.state.test, function() 
    {       
        db.fixtures(data);
    });
}

countryModel.doFixtures  = function () {
    countryModel.deleteFixtures(countryModel.startFixtures);
}

countryModel.get = function (page, pagesize, orderby, order, callback) {
    db.connect(db.state.test, function() 
    {       
        // for now we can ignore page, pagesize, orderby, order
        db.get().query('select * from Country', function (error, rows) 
        {
            if(error) {
                throw error;
            }
            else {
                if(callback)
                    callback(rows);
            }
        });
    });    
}

countryModel.getCountryById = function(id, callback) {
    db.connect(db.state.test, function() 
    {        
        db.get().query('select * from Country where CountryId='+id, function (error, rows) 
        {
            if(error) {
                throw error;
            }
            else {
                if(callback)
                    callback(rows);
            }
        });
    });    
}

function insertStatement(table, newObject) 
{
    var keys = Object.keys(newObject);
    var values = keys.map(function(key) { return "'" + newObject[key]+"'"});
    return "INSERT INTO " + table + " (" 
        + keys.join(',') 
        + ",IsActive, Created_At, Updated_At) VALUES ("
        + values.join(',')
        + ",1,now(), now() )";
}

function updateStatement(table, key, id, updateObject) 
{    
    var keys = Object.keys(updateObject);
    var stmt  = "UPDATE " + table + " SET ";
    //console.log(keys);
    keys.forEach(function(element) {
        stmt = stmt + element + " = '" + updateObject[element] +"'," ;
    }, this); 
    stmt = stmt + "Updated_at =  now() where " + key + " = " + id;   
    return stmt;
}

function softDeleteStatement(table, key, id) {
    var stmt  = "UPDATE " + table + " SET IsActive = 0, Deleted_At = now(), Updated_At = now()";
    stmt = stmt + " where " + key + "=" + id;
    return stmt;
}

countryModel.createCountry = function (newCountry, callback) 
{
    db.connect(db.state.test, function() 
    {
        stmt = insertStatement("Country", newCountry); 
        //console.log(stmt);
        db.get().query(stmt, function(error, result) 
        {
                if(error) {
                    throw error;
                }
                else {
                    if(callback) 
                    {
                        var sendResult = {
                                status:"ok",
                                rowid:result.insertId,
                                desc:"Country successfuly created",
                                affectedRows: result.affectedRows
                        }
                        // console.log(result);    /// logs
                        callback(sendResult);                        
                    }
                }        
                console.log(error);
            });
    });
}

countryModel.updateCountry = function (CountryId, country, callback) 
{
    db.connect(db.state.test, function() 
    {
        stmt = updateStatement("Country", "CountryId", CountryId, country);
        //console.log(stmt);
        db.get().query(stmt, function(error, result) 
        {
                if(error) {
                    throw error;
                }
                else {
                    if(callback) 
                    {
                        var sendResult = {
                                status:"ok",                       
                                desc:"Country successfuly updated",
                                affectedRows: result.affectedRows
                        }
                        //console.log(result);    /// logs
                        callback(sendResult);                        
                    }
                }        
                console.log(error);

        });
    });
};

countryModel.softDeleteCountry = function(CountryId, callback) {
    db.connect(db.state.test, function() 
    {
        stmt = softDeleteStatement("Country","CountryId", CountryId);
        db.get().query(stmt, function(error, result) 
        {
                if(error) {
                    throw error;
                }
                else {
                    if(callback) 
                    {
                        var sendResult = {
                                status:"ok",         
                                desc:"Country successfuly soft-deleted",
                                affectedRows: result.affectedRows
                        }
                        //console.log(result);    /// logs
                        callback(sendResult);                        
                    }
                }        
                console.log(error);
        });
    });
}

countryModel.getLocs = function(CountryId, callback) {
    db.connect(db.state.test, function() 
    {
        stmt = 'select * from Location where CountryId=' + CountryId; 
        db.get().query(stmt, function(error, rows) 
        {
            if(error) {
                throw error;
            }
            else {        
                if(callback)
                    callback(rows);
            }
        });
    });
};

countryModel.createLocation = function (newLocation, callback) 
{
    db.connect(db.state.test, function() 
    {
        stmt = insertStatement("Location", newLocation); 
        //console.log(stmt);
        db.get().query(stmt, function(error, result) 
        {
                if(error) {
                    throw error;
                }
                else {
                    if(callback) 
                    {
                        var sendResult = {
                                status:"ok",
                                rowid:result.insertId,
                                desc:"Location successfuly created",
                                affectedRows: result.affectedRows
                        }
                        //console.log(result);    /// logs
                        callback(sendResult);                        
                    }
                }        
                console.log(error);
            });
    });
}

countryModel.updateLocation = function (LocationId, location, callback) 
{
    db.connect(db.state.test, function() 
    {
        stmt = updateStatement("Location", "LocationId", LocationId, location);
        //console.log(stmt);
        db.get().query(stmt, function(error, result) 
        {
                if(error) {
                    throw error;
                }
                else {
                    if(callback) 
                    {
                        var sendResult = {
                                status:"ok",                
                                desc:"Location successfuly updated",
                                affectedRows: result.affectedRows
                        }
                        //console.log(result);    /// logs
                        callback(sendResult);                        
                    }
                }        
                console.log(error);
        });
    });
};

countryModel.softDeleteLocation = function(LocationId, callback) {
    db.connect(db.state.test, function() 
    {
        stmt = softDeleteStatement("Location","LocationId", LocationId);
        db.get().query(stmt, function(error, result) 
        {
                if(error) {
                    throw error;
                }
                else {
                    if(callback) 
                    {
                        var sendResult = {
                                status:"ok",                
                                desc:"Location successfuly soft-deleted",
                                affectedRows: result.affectedRows
                        }
                        //console.log(result);    /// logs
                        callback(sendResult);                        
                    }
                }        
                console.log(error);
        });
    });
}

countryModel.getLocationByIds = function(CountryId, LocationId, callback) {
    db.connect(db.state.test, function() 
    {        
        db.get().query('select * from Location where CountryId=' + CountryId + " and LocationId=" + LocationId, function (error, rows) 
        {
            if(error) {
                throw error;
            }
            else {
                if(callback)
                    callback(rows);
            }
        });
    });    
}

module.exports = countryModel;