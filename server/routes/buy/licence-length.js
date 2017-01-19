const handlers = {
  get: function (request, reply) {
    return reply.view('licence-length', {
      pageTitle: 'How long do you want your licence to last?',
      errorMessage: 'Choose a licence length',
      //myDate: request.session.date
      items: {
          one: {
            text: '1 day',
            name: 'licence_length',
            id: '1-day',
          },
          two: {
            text: '8 days',
            name: 'licence_length',
            id: '8-days (These licences are valid for 8 consecutive days)',
            value: '8-days',
            selectedText: '8-day licences are valid for 8 consecutive days',
          },
          three: {
            text: '12 months',
            name: 'licence_length',
            id: '365-days',
            value: '365-days',
            selectedText: 'A 12-month licence is not available for the start date of you selected. We will amend the date to 1 April 2017',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceLength = request.payload.licence_length
    returnURL = request.query.returnUrl

    if (request.session.licenceLength === '365-days' && request.session.licenceType === 'Trout and coarse') {
      request.session.is365Contact = true;
      if (returnURL) {
        return reply.redirect('number-of-rods?returnUrl=/buy/summary')
      } else {
        return reply.redirect('number-of-rods')
      }
    } else if (request.session.licenceLength === '365-days') {
      request.session.is365Contact = true;
      if (returnURL) {
        return reply.redirect('disability?returnUrl=/buy/summary')
      } else {
        return reply.redirect('disability')
      }
    }
    //else if (request.session.haveTime === true){
    //   if (returnURL) {
    //     return reply.redirect(returnURL)
    //   } else {
    //     return reply.redirect('find-address')
    //   }
    // }
    else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        if (request.session.haveTime === true) {
          return reply.redirect('find-address')
        } else {
          return reply.redirect('licence-start-time')
        }

      }
    }
  }
}



module.exports = [{
  method: 'GET',
  path: '/buy/licence-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-length',
  config: {
    handler: handlers.post
  }
}]
