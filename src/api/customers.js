const sql = require('../sql');

const SCHEMA = 'SalesLT';
const TABLE_CUSTOMER  = 'Customer';

function getAll (request, response) {
  const SQL_STMT = `SELECT * FROM ${SCHEMA}.${TABLE_CUSTOMER}`;

  sql.connection().then((connection) => {
    connection.sendQuery(SQL_STMT).then((records) => {
      response.status(200).send(records);
    });
  });
}

exports = module.exports = {
  getAll
}