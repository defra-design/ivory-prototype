const Glue = require('glue')
const manifest = require('./manifest')

const options = {
  relativeTo: __dirname
}

const users = {
  john: {
    username: 'john',
    password: 'doe',
    name: 'John Doe',
    id: '2133d32a'
  }
}

const validate = function (request, username, password, callback) {
  const user = users[username]
  if (!user) {
    return callback(null, false)
  }

  if (user.password === password) {
    callback(null, true, { id: user.id, name: user.name })
  } else {
    callback(new Error('Incorrect password'), false)
  }
}

function composeServer (callback) {
  Glue.compose(manifest, options, function (err, server) {
    if (err) {
      return callback(err)
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate })

    /**
     * Load all routes
     */
    server.route(require('./routes'))

    /**
     * Configure views
     */
    server.views(require('./views'))

    callback(null, server)
  })
}

module.exports = composeServer
