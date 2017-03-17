const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
var config = require('./sql_config.js');
var statements = require('./statements.js');

var connection = new Connection(config["debug"]);

connection.on('connect', (err, socket) => {
  if (err) console.error(err);
  
  console.log(`Connected and logged in to ${process.env.SQL_HOSTNAME}`);
  connection.execSql(req);
});

connection.on('end', (err) => {
  if (err) console.error(err);

  console.log('Connection closed.');
});

var rows = [];

var req = new Request(statements[0], (err, rowCount, rows) => {
  if (err) console.error(err);

  console.log(`rowCount: ${rowCount}\n`);
  console.log(rows);
});

req.on('row', (fields) => {
  // convert to name:value pairs
  var simpleRow = {};
  fields.forEach((field) => {
    simpleRow[field.metadata.colName] = field.value;
  });
  rows.push(simpleRow);
});

req.on('requestCompleted', (rowCount, more) => {
  console.log('Request completed.');
  connection.close();
  rows.forEach((row) => {console.log(row)});
});
