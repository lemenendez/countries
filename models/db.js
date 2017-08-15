var mysql = require('mysql');
var config = require('../config.json');
var async = require('async');

var state = {
    pool: null,
    test:false
}

exports.state = state;

exports.fixtures = function(data) 
{
  //var tables = Object.keys(data.tables);
  data.tables.sort(function(a, b){
        if (a.delete_order < b.delete_order) return -1;
        else if (a.delete_order > b.delete_order) return 1;
        return 0;
    });
  data.tables.forEach(function(table) {
        table.data.forEach(function(row, index) {
          var keys = Object.keys(row);
          var values = keys.map(function(key) { return "'" + row[key]+"'"});
          var insert_stmt;
          insert_stmt = 'INSERT INTO ' + table.name + ' ('+ keys.join(',')+') values (' + values.join(',')+')';
          // console.log(insert_stmt);
          state.pool.query (insert_stmt);
      });
  });  
}

exports.drop = function(data, done) 
{
    ///console.log("calling delete");
    data.tables.sort(function(a, b){
        if (a.delete_order < b.delete_order) return -1;
        else if (a.delete_order > b.delete_order) return 1;
        return 0;
    });
    data.tables.forEach(function (table){
        var delete_stmt = 'DELETE FROM ' + table.name;
        // console.log(delete_stmt);
        state.pool.query(delete_stmt, function(error)
        {
            console.log(error);        
        });  
    });
    done();
}

exports.connect = function(test, done) {
    state.pool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: test ? config.database_test:config.database
    });

    state.test = test;

    if(done)
        done();
}

exports.get = function() {
    return state.pool;
}