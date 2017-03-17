const path = require('path');
const express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, '../browser')));
app.get('/customers', require('./customers.js').getAll);

app.listen(3000);
console.log('Listening on port 3000');