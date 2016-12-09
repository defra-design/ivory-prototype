const handlers = {
  get: function (request, reply) {
    return reply.view('licence-type', {
      pageTitle: 'What fish should your licence cover?',
      errorMessage: 'Choose a licence type',
      items: {
        one: {
          text: 'Trout and coarse',
          name: 'licence_type',
          id: 'Trout and coarse',
        },
        two: {
          text: 'Salmon and sea trout',
          subText: 'includes trout and coarse fish',
          name: 'licence_type',
          id: 'Salmon and sea trout',
        },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceType = request.payload.licence_type
    returnURL = request.query.returnUrl

    // is salmon
    if (request.session.licenceType === 'Coarse fish and trout') {
      request.session.numberOfRods = 'Up to 2 rods'
    } else {
      request.session.numberOfRods ='1 rod (or up to 2 rods for trout and coarse fish)'
    }

    // Jump to summary if junior
    if (request.session.startAge < 17) {
      request.session.licenceLength = '365-day'
      request.session.isJunior = true
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('contact')
      }
    } else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('licence-length')
      }
    }
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/licence-type',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-type',
  config: {
    handler: handlers.post
  }
}]
