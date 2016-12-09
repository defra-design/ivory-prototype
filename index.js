const config = require('./config')
const composeServer = require('./server')
const pkg = require('./package.json')
const appName = pkg.name
const appVersion = pkg.version

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    if (user.password === password) {
      callback(null, true, { id: user.id, name: user.name })
    } else {
      callback(new Error('Incorrect password'), false)
    }
};




if (!module.parent) {
  // There's no callee so we're running
  // normally and will compose and start a server
  composeServer(function (err, server) {
    if (err) {
      throw err
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
      method: 'GET',
      path: '/foo',
      config: {
        auth: 'simple',
        handler: function (request, reply) {
          reply({ ok: 200 })
        }
      }
    })

    /**
     * Start the server
     */
    server.start(function (err) {
      var details = {
        name: appName,
        version: appVersion,
        info: server.info
      }

      if (err) {
        details.error = err
        details.message = 'Failed to start ' + details.name
        server.log(['error', 'info'], details)
        throw err
      } else {
        details.config = config
        details.message = 'Started ' + details.name
        server.log('info', details)
        console.info('Server running at:', server.info)
      }
    })
  })
} else {
  // There's a callee so we're probably running a test.
  // In which case just export the compose server function
  module.exports = composeServer
}
