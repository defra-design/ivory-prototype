const pg = require('pg');
const connectionString = process.env.DATABASE_CONN;

////////////////////////////////////////////////////////////
//GET CLIENT
exports.getOwnerClient = function() {
  console.log('DEBUG.dbOwner.getOwnerClient.connectionString: ' + connectionString);
  var client = new pg.Client({
    connectionString: connectionString
  })
  return client;
}
