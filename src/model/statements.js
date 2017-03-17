const SCHEMA_NAME = 'SalesLT';

// a basic request
const _sql1 = `
  SELECT * FROM ${SCHEMA_NAME}.Customer
`

// a more complex request

const _sql2 = `
  SELECT
    customers.CustomerID,
    customers.CompanyName,
    COUNT(orders.SalesOrderID) AS OrderCount
  FROM ${SCHEMA_NAME}.Customer AS customers
  LEFT OUTER JOIN ${SCHEMA_NAME}.SalesOrderHeader AS orders 
    ON customers.CustomerID = orders.CustomerID
  GROUP BY customers.CustomerID, customers.CompanyName
  ORDER BY OrderCount DESC;
`

exports = module.exports = [
  _sql1,
  _sql2
]