const handlers = {
  get: function (request, reply) {

    if (request.session.licenceLength === '1-day' || request.session.licenceLength === '1 day') {
      request.session.haveTime = false
    } else if (request.session.licenceLength === '8-days' || request.session.licenceLength === '8 days') {
      request.session.haveTime = false
    } else {
      request.session.haveTime = true
    }

    return reply.view('licence-start-option', {
      pageTitle: 'When would you like your licence to start?',
      errorMessage: 'Choose when you\'d like your licence to start',
      items: {
          one: {
            text: 'Now',
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

    // Calculate start date
    var date = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[date.getMonth()];

      if (startOption === 'asap') {
        request.session.startText = "30 minutes after payment"
        request.session.haveTime = true
        request.session.date = date
        request.session.startDate = date.getUTCDate()
        request.session.startMonth = n
        request.session.startYear = date.getFullYear()
        var startTime = date.getHours();
        request.session.startTime = startTime +':00'

        if (returnURL) {
          return reply.redirect(returnURL)
        }


        else if (request.session.isJunior === true) {
          return reply.redirect('upgrade-licence')
        }

        else if (request.session.isSenior === true || request.session.isFull === false ) {
            return reply.redirect('licence-type')
          } else {
            return reply.redirect('disability')
          }

        }

        else {
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
