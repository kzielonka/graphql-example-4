const { Pool } = require('pg')

module.exports = new Pool({
  host: 'localhost',
  user: 'graphql',
  password: 'password',
  database: 'dor_graphql_example',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})


