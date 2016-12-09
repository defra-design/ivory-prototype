exports.register = function (server, options, next) {
  const preResponse = function (request, reply) {
    var response = request.response

    if (response.isBoom) {
      // An error was raised during
      // processing the request
      var statusCode = response.output.statusCode

      // In the event of 404
      // return the `404` view
      if (statusCode === 404) {
        return reply.view('404').code(statusCode)
      }

      request.log('error', {
        statusCode: statusCode,
        data: response.data,
        message: response.message
      })

      if (statusCode === 500) {
        console.error(response.message)

        // The return the `500` view
        return reply.view('500', {
          message: response.message,
          data: response.data
        }).code(statusCode)
      }
    }

    return reply.continue()
  }

  // Register the extension
  server.ext('onPreResponse', preResponse)

  next()
}

exports.register.attributes = {
  name: 'pre-response-ext',
  pkg: require('../../package.json')
}
