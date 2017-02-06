const handlers = {
  get: function (request, reply) {
    return reply.view('licence-type', {
      pageTitle: 'What type of fishing licence do you want?',
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

    // var april = new Date("April 01, 2016 11:13:00");
    // var april = Date.parse("April 01, 2017");
    // var licenceStart = Date.parse(request.session.date);

    // Rods
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.numberOfRods ='1 rod (or up to 3 rods for coarse fish)'
      } else if (request.session.licenceType === 'Trout and coarse') {
          request.session.numberOfRods = 'Up to 2 rods'
      }



      if (returnURL) {
        if (request.session.licenceLength === '12-months' && request.session.licenceType === 'Trout and coarse') {
          return reply.redirect('number-of-rods?returnUrl=/buy/summary')
        } else {
          return reply.redirect(returnURL)
        }
      } else {
        if (request.session.licenceLength === '365-days' && request.session.licenceType === 'Trout and coarse') {
          return reply.redirect('number-of-rods')
        } else {
          return reply.redirect('contact')
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
