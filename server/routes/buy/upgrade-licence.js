const handlers = {
  get: function (request, reply) {

    if (request.session.licenceLength === '1-day' ) {
      request.session.daysSelected = "a 1-day"
    } else {
      request.session.daysSelected = "an 8-day"
    }

    return reply.view('upgrade-licence', {
      pageTitle: 'We\'ve upgraded your licence',
      pageMessage: 'We do not offer a concession price for juniors buying 1 day or 8 day licences.',
      pageMessageTwo: 'As juniors aged 12-16 are entitled to a free 12-month licence, we have upgraded your licence to a junior 12-month licence without charge.',
      LicenceLength: request.session.daysSelected
    })
  },
  post: function (request, reply) {
    request.session.licenceLength = '365 days'
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('name')
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
