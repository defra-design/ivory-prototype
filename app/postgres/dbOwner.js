const pg = require('pg')
const connectionString = 'postgresql://ivoryservice:ivoryservice@localhost:5432/ivorydb'

////////////////////////////////////////////////////////////
//GET CLIENT
////////////////////////////////////////////////////////////
exports.getOwnerClient = function() {

  var client = new pg.Client({
    connectionString: connectionString,
  })
  return client;

}
