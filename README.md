A simple app which connects to SQL with [tedious][] and surfaces records as
objects via an Express API.

[tedious]: https://github.com/tediousjs/tedious

## Caveats

* Make sure the SQL server firewall allows access to the web server.
* Assumes databse is populated with AdventureWorksLT sample database.
  * Instructions [here](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-get-started-portal).
  * Also an option when creating a SQL DB in the portal.
* Use SQL Authentication (username:password) for easy compat with Azure SQL.

## Setup

1. Copy .env.template to .env in your own repo and populate the variables.
   The Azure ones are for use with `scripts/webapp-deploy.sh`.
1. `npm install`
1. `node .` (from repo root).
1. Browse or curl `http://localhost:3000/customers`.

Alternatively, deploy the web app to Azure Web Apps, populate App Settings with
the same env vars, and open the SQL server firewall.

## License

See [LICENSE.md](./LICENSE.md).

