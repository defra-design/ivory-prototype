const handlers = {
  get: function (request, reply) {
    return reply.view('download-option', {
      pageTitle: 'You do not need a licence',
      errorMessage: 'Choose a licence type',
      items: {
        one: {
          text: 'Trout and coarse',
          name: 'licence_type',
          id: 'Trout and coarse',
          value: 'Trout_and_coarse',
          // selectedText: 'Non-migratory ',
        },
        two: {
          text: 'Salmon and sea trout',
          subText: 'includes trout and coarse fish',
          name: 'licence_type',
          id: 'Salmon and sea trout',
          value: 'Salmon_and_sea_trout',
          // selectedText: 'Migratory',
        },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceType = request.payload.licence_type
    returnURL = request.query.returnUrl

    // Rods
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.numberOfRods ='1 rod (or up to 3 rods for trout and coarse fish)'
      } else if (request.session.licenceType === 'Trout and coarse') {
          request.session.numberOfRods = 'Up to 2 rods'
      }

    if (request.session.beforeApril === true) {
      if (request.session.isJunior === true) {
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('summary')
        }
      } else {
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('licence-short-term-length')
        }
      }
    } else {
      if (request.session.isJunior === true) {
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('summary')
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
}


module.exports = [{
  method: 'GET',
  path: '/buy/download-option',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/download-option',
  config: {
    handler: handlers.post
  }
}]
