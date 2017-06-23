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


      if (startOption === 'asap') {

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

        request.session.startText = "30 minutes after payment"
        request.session.haveTime = true

        // String date for summary page
        request.session.startDate = date.getUTCDate()
        request.session.startMonth = n
        request.session.startYear = date.getFullYear()

        // Number date to calculkate age at start date
        request.session.date = date
        request.session.day = date.getDate();
        request.session.month = date.getMonth()+1;
        request.session.year = date.getFullYear();
        var startTime = date.getHours();


        request.session.startTime = startTime +':00'


        // Calculate age at start
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
        }


        else if (request.session.startAge < 17) {
          return reply.redirect('upgrade-licence')
        }

        else if (request.session.startAge > 65 || request.session.isFull === false ) {
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
