const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-option', {
      pageTitle: 'When would you like your licence to start?',
      errorMessage: 'Choose when you\'d like your licence to start',
      items: {
          one: {
            text: 'now',
            name: 'licence_start_option',
            id: 'asap',
            value: 'asap',
            selectedText: 'Your licence will not be valid until 30 minutes after payment',
          },
          two: {
            text: 'Another time or date',
            name: 'licence_start_option',
            id: 'absolute',
            value: 'absolute',
          },
      }
    })
  },
  post: function (request, reply) {
    var startOption = request.payload.licence_start_option
    returnURL = request.query.returnUrl

    // Calculate age at licence start date
    var date = new Date();
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };


    if (request.session.isRenew === true) {

      if (startOption === 'asap') {
        request.session.startText = "30 minutes after payment"
        request.session.haveTime = true
        request.session.date = date
        request.session.startDate = date.toLocaleDateString("en-us", options)
        var startTime = date.getHours();
        request.session.startTime = startTime +":00"
        return reply.redirect('summary')
      } else {
        if (returnURL) {
          return reply.redirect('licence-start-day?returnUrl=/buy/summary')
        } else {
          return reply.redirect('licence-start-day')
        }
      }

    }


    else if (request.session.isUpgrade === true || request.session.isUpgradeLength === true) {

      if (startOption === 'asap') {
        request.session.startText = "30 minutes after payment"
        request.session.haveTime = true
        request.session.date = date
        request.session.startDate = date.toLocaleDateString("en-us", options)
        var startTime = date.getHours();
        request.session.startTime = startTime +":00"
        return reply.redirect('summary')
      } else {
        if (returnURL) {
          return reply.redirect('licence-start-day?returnUrl=/buy/summary')
        } else {
          return reply.redirect('licence-start-day')
        }
      }

    } else {
      if (startOption === 'asap') {
        request.session.startText = "30 minutes after payment"
        request.session.haveTime = true
        request.session.date = date
        request.session.startDate = date.toLocaleDateString("en-us", options)
        var startTime = date.getHours();
        request.session.startTime = startTime +":00"
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('contact')
        }
        } else {
          if (returnURL) {
            return reply.redirect('licence-start-day?returnUrl=/buy/summary')
          } else {
            return reply.redirect('licence-start-day')
          }
        }
    }



  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-start-option',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-start-option',
  config: {
    handler: handlers.post
  }
}]
