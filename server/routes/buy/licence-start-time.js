const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-time', {
      pageTitle: 'What time would you like the licence to start on ',
      startDate: request.session.startDate,

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
            text: 'Midday',
            name: 'licence_start_time',
            id: 'Midday',
          },
          two: {
            text: '1pm',
            name: 'licence_start_time',
            id: '1pm',
          },
          three: {
            text: '2pm',
            name: 'licence_start_time',
            id: '2pm',
          },
          four: {
            text: '3pm',
            name: 'licence_start_time',
            id: '3pm',
          },
          five: {
            text: '4pm',
            name: 'licence_start_time',
            id: '4pm',
          },
          six: {
            text: '5pm',
            name: 'licence_start_time',
            id: '5pm',
          },
          seven: {
            text: '6pm',
            name: 'licence_start_time',
            id: '6pm',
          },
          eight: {
            text: '7pm',
            name: 'licence_start_time',
            id: '7pm',
          },
          nine: {
            text: '8pm',
            name: 'licence_start_time',
            id: '8pm',
          },
          ten: {
            text: '9pm',
            name: 'licence_start_time',
            id: '9pm',
          },
          eleven: {
            text: '10pm',
            name: 'licence_start_time',
            id: '10pm',
          },
          twelve: {
            text: '11pm',
            name: 'licence_start_time',
            id: '11pm',
          },
      }
    })
  },
  post: function (request, reply) {
    request.session.startTime = request.payload.licence_start_time
    returnURL = request.query.returnUrl

    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('find-address')
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
