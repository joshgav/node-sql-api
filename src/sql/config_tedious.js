const DATABASE_NAME = process.env.SQL_DBNAME;

var options = {
  encrypt: true,
  database: DATABASE_NAME,
}

var debugOptions = {
  data: true,
  packet: false,
  payload: false,
  token: false
}

var debug = {
  userName: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_HOSTNAME,
  options,
  debug: debugOptions,
}

var prod = {
  userName: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_HOSTNAME,
  options,
}

exports = module.exports = {
  prod,
  debug
}