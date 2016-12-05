const config = require('../config')

const manifest = {
  server: {
    connections: {
      routes: {
        validate: {
          options: {
            abortEarly: false
          }
        },
        cache: {
          otherwise: 'no-cache, must-revalidate, max-age=0, no-store'
        },
        security: {
          xframe: 'deny',
          hsts: {
            includeSubDomains: true
          }
        }
      }
    }
  },
  connections: [
    {
      port: process.env.PORT || config.server.port,
      host: config.server.home,
      labels: config.server.labels
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'inert'
      }
    },
    {
      plugin: {
        register: 'vision'
      }
    },
    {
      plugin: {
        register: 'lout'
      }
    },
    {
      plugin: {
        register: 'good',
        options: config.logging
      }
    },
    {
      plugin: {
        register: './plugins/ext-pre-response'
      }
    },
      {
      plugin: {
        register: 'hapi-server-session',
        options: {
          cookie: {
            isSecure: false,
          },
        },
      }
    },
      {
      plugin: {
        register: 'hapi-context-credentials'
      }
    },
    {
    plugin: {
      register: 'hapi-auth-cookie'
    }
  }
  ]
}

module.exports = manifest
