A simple app which connects to SQL with [tedious][] and surfaces objects via an Express API.

[tedious]: https://github.com/tediousjs/tedious

### Caveats

* Assumes DATABASE\_NAME populated with AdventureWorksLT sample database.
  * Instructions [here](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-get-started-portal).
* Uses SQL Authentication (username:password) for easy compat with Azure SQL.

### Setup

1. Create a `.env` file in root of repo with at least the following key:value pairs:

```bash
SQL_USERNAME=_username_
SQL_PASSWORD=_password_
SQL_HOSTNAME=_hostname_.database.windows.net
SQL_DBNAME=_database_name_
```

2. `npm install`
3. `node .` (from repo root).
4. Browse or curl `http://localhost:3000/customers`.
