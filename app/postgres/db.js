const pg = require('pg')
const connectionString = process.env.DATABASE_CONN

/// /////////////////////////////////////////////////////////
// GET CLIENT
exports.getClient = function () {
  console.log('DEBUG.db.getDbClient.connectionString: ' + connectionString)
  var client = new pg.Client({
    connectionString: connectionString
  })
  return client
}
