const handlers = {
  get: function (request, reply) {
    return reply.view('licence-start-day', {
      pageTitle: 'When would you like your licence to start? ',
      errorMessage: 'Enter a valid date that is within 60 days',
    })
  },
  post: function (request, reply) {
    request.session.day = request.payload.licence_start_day
    request.session.month = request.payload.licence_start_month
    request.session.year = request.payload.licence_start_year
    returnURL = request.query.returnUrl

    // Calculate start date
    var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    request.session.date = date
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

    // String date for summary page
    request.session.startDate = date.getUTCDate()
    request.session.startMonth = n
    request.session.startYear = date.getFullYear()

    // Calculate age at licence start date
    var date = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };
    var startDate = new Date(Date.UTC(request.session.year, request.session.month -1, request.session.day));
    var birthDate = new Date(Date.UTC(request.session.birthYear, request.session.birthMonth -1, request.session.birthDay));
    var startAge = startDate.getFullYear() - birthDate.getFullYear();
    var m = startDate.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && startDate.getDate() < birthDate.getDate())) {
          startAge--;
      }

    request.session.startAge = startAge




      if (returnURL) {
        return reply.redirect(returnURL)
      } else if (request.session.haveTime === true) {
         request.session.startTime = '00.01'

         if (request.session.startAge < 17) {
           return reply.redirect('upgrade-licence')
         }

         if (request.session.startAge > 65) {
           return reply.redirect('licence-type')
         }

         if (request.session.isFull === false ) {
           return reply.redirect('licence-type')
         } else {
           return reply.redirect('disability')
         }

       }  else {
          return reply.redirect('licence-start-time')
        }
      }

}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-start-day',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-start-day',
  config: {
    handler: handlers.post
  }
}]
