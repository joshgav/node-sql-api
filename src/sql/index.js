'use strict'

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
var config = require('./config_tedious.js');

var _connection = null;

function connection () {
  return new Promise((resolve,reject) => {
    if (_connection) resolve(_connection);

    _connection = new Connection(config["debug"]);

    _connection.on('connect', (err, socket) => {
      if (err) reject(err);

      console.log(`Connected and logged in to ${process.env.SQL_HOSTNAME}`);
      resolve(_connection);
    });

    _connection.on('end', (err) => {
      if (err) console.error(err);
      console.log('Connection closed.');
    });
  });
}

// returns an array of JSON objects
Connection.prototype.sendQuery = function sendQuery (statement) {

  function _requestCallback (err, rowCount) {
    if (err) console.error(err);
    console.log(`rowCount: ${rowCount}`);
  }

  return new Promise((resolve, reject) => {
    var req = new Request(statement, _requestCallback);
    try {
      this.execSql(req);
    }
    catch (err) {
      reject(err);
    }

    var rows = [];
    req.on('row', (fields) => {
      // convert to JSON name:value pairs
      var simpleRow = {};
      fields.forEach((field) => {
        simpleRow[field.metadata.colName] = field.value;
      });
      rows.push(simpleRow);
    });

    req.on('requestCompleted', () => {
      console.log(`Request completed.`);
      resolve(rows);
    });
  });
};

exports = module.exports = {
  connection,
}