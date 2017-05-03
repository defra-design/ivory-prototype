const config = require('../config')

const manifest = {
  server: {
    connections: {
      routes: {
        //auth: 'session',
        auth: 'simple',
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
          name: 'cathy',
          cookie: {
            isSecure: false
          }
        }
      }
    },
    {
      plugin: {
        register: 'hapi-context-credentials'
      }
    },
    {
      plugin: {
        register: 'hapi-auth-basic'
      }
    },
    {
      plugin: {
        register: 'hapi-auth-cookie'
      }
    }






    //{
      // plugin: {
      //   register: 'yar',
      //   options: {
      //     storeBlank: false,
      //     cookieOptions: {
      //       password: 'the-password-must-be-at-least-32-characters-long',
      //       isSecure: true
      //     }
      //   }
      // }
    //}
  ]
}

module.exports = manifest
