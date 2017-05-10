const handlers = {
  get: function (request, reply) {

    return reply.view('add-another', {
      pageTitle: 'Do you want to buy another licence?',
      errorMessage: 'Tell us if you want to buy another licence',
      items: {
        one: {
          text: 'Yes',
          name: 'multibuy',
          id: 'yes',
        },
        two: {
          text: 'No',
          name: 'multibuy',
          id: 'no',
        },
      }
    })
  },
  post: function (request, reply) {
    // Make a copy of the current user and save it in our new array.
    var user = JSON.parse(JSON.stringify(request.session))
    global.users.push(user)

    // Clear session
    request.session = {}

    request.session.multibuy = true
    var multibuy = request.payload.multibuy
    if (multibuy === 'yes') {
      return reply.redirect('licence-length')
    } else {
      return reply.redirect('terms-conditions')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/add-another',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/add-another',
  config: {
    handler: handlers.post
  }
}]
