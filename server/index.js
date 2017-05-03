const Glue = require('glue')
const manifest = require('./manifest')

const options = {
  relativeTo: __dirname
}

const users = {
  iwtf: {
    username: 'iwtf',
    password: 'prototype',
    name: 'Mr Fish',
    id: '2133d32b'
  }
}

const sessionPluginOptions = {
  cache: { segment: 'unique-cache-sement' },
  cookie: { isSecure: false },
  key: 'super-secret-cookie-encryption-key'
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
