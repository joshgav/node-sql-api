var sql = require('../sql');

function getAll (req, res) {
  const SCHEMA = 'SalesLT';
  const TABLE  = 'Customer';
  const SQL    = `SELECT * FROM ${SCHEMA}.${TABLE}`;

  sql.connection().then((connection) => {
    connection.sendQuery(SQL).then((records) => {
      res.status(200).send(records);
    });
  });
}

exports = module.exports = {
  getAll
};