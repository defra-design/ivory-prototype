// Note: prototype config can be overridden using environment variables (eg on heroku)

module.exports = {
  serviceName: 'Service name goes here',

  // Default port that prototype runs on
  port: '3000',

  // Enable or disable password protection on production
  useAuth: 'true',

  // Automatically stores form data, and send to all views
  useAutoStoreData: 'true',

  // Enable or disable built-in docs and examples.
  useDocumentation: 'true',

  // Force HTTP to redirect to HTTPS on production
  useHttps: 'true',

  // Cookie warning - update link to service's cookie page.
  cookieText: 'GOV.UK uses cookies to make the site simpler. <a href="#">Find out more about cookies</a>',

  // Enable or disable Browser Sync
  useBrowserSync: 'true',

  // Get the absolute path of the root application directory
  // (Beware an alternative way of setting this using 'path.dirname(require.main.filename)' is different on localhost and Heroku)
  rootAppDirectory: __dirname
}
