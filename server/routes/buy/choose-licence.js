const handlers = {
  get: function (request, reply) {
    return reply.view('choose-licence', {
      pageTitle: 'What do you want to do?',
      errorMessage: 'Choose a licence type',
      items: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'choose_licence',
          id: 'Buy_a_new_12_month_licence',
          value: 'Buy_a_new_12_month_licence',
        },
        two: {
          text: 'Buy a new short term licence',
          name: 'choose_licence',
          id: 'Buy_a_new_short_term_licence',
          value: 'Buy_a_new_short_term_licence',
        },
      },
    })
  },
  post: function (request, reply) {
    request.session.chooseLicence = request.payload.choose_licence
    returnURL = request.query.returnUrl
    if (returnURL) {
      return reply.redirect(returnURL)
    } else  {
      return reply.redirect('name')
    }
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/choose-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/choose-licence',
  config: {
    handler: handlers.post
  }
}]
