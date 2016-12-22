const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-option', {
      pageTitle: 'When would you like your licence to start?',
      errorMessage: 'Choose when you\'d like your licence to start',
      items: {
          one: {
            text: '30 minutes after payment',
            name: 'licence_start_option',
            id: 'asap',
            value: 'asap',
            //selectedText: '365-day licences are only available from April 1st 2017',
          },
          two: {
            text: 'Another time or date',
            name: 'licence_start_option',
            id: 'absolute',
            value: 'absolute',
            //selectedText: 'ddddddd',
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


    if (startOption === 'asap') {
      request.session.startText = "30 minutes after payment"
      request.session.startAge = request.session.age
      request.session.date = date
      request.session.startDate = date.toLocaleDateString("en-us", options)
      //Set time
      var startTime = date.getHours();
      request.session.startTime = startTime +":00"
      request.session.haveTime = true

      if (request.session.startAge < 12) {
        return reply.redirect('no-licence-required')
      } else {
        request.session.beforeApril = true
        if (returnURL) {
          return reply.redirect(returnURL)
        } else {
          return reply.redirect('licence-type')
        }
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
