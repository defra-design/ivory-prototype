const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-time', {
      pageTitle: 'What time would you like the licence to start on ',
      startDay: request.session.startDay,

      errorMessage: 'Choose a start time',
      items: {
          one: {
            text: 'Midnight',
            name: 'licence_start_time',
            id: 'Midnight',
          },
          two: {
            text: '1am',
            name: 'licence_start_time',
            id: '1am',
          },
          three: {
            text: '2am',
            name: 'licence_start_time',
            id: '2am',
          },
          four: {
            text: '3am',
            name: 'licence_start_time',
            id: '3am',
          },
          five: {
            text: '4am',
            name: 'licence_start_time',
            id: '4am',
          },
          six: {
            text: '5am',
            name: 'licence_start_time',
            id: '5am',
          },
          seven: {
            text: '6am',
            name: 'licence_start_time',
            id: '6am',
          },
          eight: {
            text: '7am',
            name: 'licence_start_time',
            id: '7am',
          },
          nine: {
            text: '8am',
            name: 'licence_start_time',
            id: '8am',
          },
          ten: {
            text: '9am',
            name: 'licence_start_time',
            id: '9am',
          },
          eleven: {
            text: '10am',
            name: 'licence_start_time',
            id: '10am',
          },
          twelve: {
            text: '11am',
            name: 'licence_start_time',
            id: '11am',
          },
      },
      itemsTwo: {
          one: {
            text: 'Midnight',
            name: 'licence_start_time',
            id: 'Midnight',
          },
          two: {
            text: '1am',
            name: 'licence_start_time',
            id: '1am',
          },
          three: {
            text: '2am',
            name: 'licence_start_time',
            id: '2am',
          },
          four: {
            text: '3am',
            name: 'licence_start_time',
            id: '3am',
          },
          five: {
            text: '4am',
            name: 'licence_start_time',
            id: '4am',
          },
          six: {
            text: '5am',
            name: 'licence_start_time',
            id: '5am',
          },
          seven: {
            text: '6am',
            name: 'licence_start_time',
            id: '6am',
          },
          eight: {
            text: '7am',
            name: 'licence_start_time',
            id: '7am',
          },
          nine: {
            text: '8am',
            name: 'licence_start_time',
            id: '8am',
          },
          ten: {
            text: '9am',
            name: 'licence_start_time',
            id: '9am',
          },
          eleven: {
            text: '10am',
            name: 'licence_start_time',
            id: '10am',
          },
          twelve: {
            text: '11am',
            name: 'licence_start_time',
            id: '11am',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.startTime = request.payload.licence_start_time
    request.session.startDate = request.session.startDay + " " + request.session.startTime
    returnURL = request.query.returnUrl

    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };

    if (request.session.licenceLength === '1 day') {
      var tomorrow = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
      tomorrow.setDate(tomorrow.getDate() + 1);
      request.session.endDate = tomorrow.toLocaleDateString("en-us", options)
    } else {
      var eightDays = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
      eightDays.setDate(eightDays.getDate() + 8);
      request.session.endDate = eightDays.toLocaleDateString("en-us", options)
    }


    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('date-of-birth')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-start-time',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-start-time',
  config: {
    handler: handlers.post
  }
}]
