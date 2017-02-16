const handlers = {
  get: function (request, reply) {
    return reply.view('upgrade-licence', {
      pageTitle: 'You qualify for a junior licence',
      // LicenceLength: request.session.daysSelected
    })
  },
  post: function (request, reply) {
    request.session.licenceLength = '12-months'
    request.session.isJunior = true
    request.session.isFull = true

    // request.session.startDate = "1 April 2017"
    // request.session.endDate = "1 April 2018"

    // Calculate the start date

    // Calculate age at licence start date
    var date = new Date();
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };


    request.session.startText = "30 minutes after payment"
    request.session.haveTime = true
    request.session.date = date
    request.session.startDate = date.toLocaleDateString("en-us", options)
    var startTime = date.getHours();
    request.session.startTime = startTime +":00"

    if (request.session.isRenew === true) {
        return reply.redirect('summary')
      } else {
        return reply.redirect('find-address')
      }

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/upgrade-licence',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/upgrade-licence',
  config: {
    handler: handlers.post
  }
}]
