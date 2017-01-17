const handlers = {
  get: function (request, reply) {

    // if (request.session.licenceLength === '1-day' ) {
    //   request.session.daysSelected = "a 1-day"
    // } else {
    //   request.session.daysSelected = "an 8-day"
    // }

    return reply.view('upgrade-licence', {
      pageTitle: 'Junior license',
      // LicenceLength: request.session.daysSelected
    })
  },
  post: function (request, reply) {
    request.session.licenceLength = '365-days'
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('licence-type')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/upgrade-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/upgrade-licence',
  config: {
    handler: handlers.post
  }
}]
