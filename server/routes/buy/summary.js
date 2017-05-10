const costCalc = require('../../lib/costs')

const handlers = {
  get: function (request, reply) {
    // Concession
    if (request.session.age > 65) {
      request.session.isConcession = true
      request.session.isSenior = true
    } else if (request.session.age < 17) {
      request.session.isConcession = true
      request.session.isJunior = true
    } else if (request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
      request.session.isConcession = true
      request.session.hasDisabledConcession = true
    } else {
      request.session.isConcession = false
    }

    costCalc.applyCosts(request)

    // End dates
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

    if (request.session.licenceLength === '1-day') {
      var tomorrow = new Date(Date.parse(request.session.date));
      tomorrow.setDate(tomorrow.getDate() + 1);
      request.session.endDate = tomorrow.getUTCDate()
      request.session.endMonth = month[tomorrow.getMonth()];
      request.session.endYear = tomorrow.getFullYear()
      request.session.endTime = request.session.startTime

    } else if (request.session.licenceLength === '8-days') {
      var eightDays = new Date(Date.parse(request.session.date));
      eightDays.setDate(eightDays.getDate() + 8);
      request.session.endDate = eightDays.getUTCDate()
      request.session.endMonth = month[eightDays.getMonth()];
      request.session.endYear = eightDays.getFullYear()
      request.session.endTime = request.session.startTime

      } else {
        var threeSixFiveDays = new Date(Date.parse(request.session.date));
        threeSixFiveDays.setDate(threeSixFiveDays.getDate() + 364);
        request.session.endDate = threeSixFiveDays.getUTCDate()
        request.session.endMonth = month[threeSixFiveDays.getMonth()];
        request.session.endYear = threeSixFiveDays.getFullYear()
        request.session.endTime = '23:59'
      }

    // Rods
    if (request.session.licenceType === 'Trout and coarse' ) {
      if (request.session.licenceLength === '8-days' || request.session.licenceLength === '1-day') {
        request.session.numberOfRods = 'Up to 2 rods'
      }
    }

    if (request.session.licenceLength === '8-days') {
      request.session.licenceLength = '8 days'
    }

    if (request.session.licenceLength === '1-day') {
      request.session.licenceLength = '1 day'
    }

    if (request.session.licenceLength === '12-months') {
      request.session.licenceLength = '12 months'
    }


    // // Make a copy of the current user and save it in our new array.
    // var user = JSON.parse(JSON.stringify(request.session))
    // global.users.push(user)


    // Total cost
    var totalCost = costCalc.getTotalCost(request)

    return reply.view('summary', {
      pageTitle: 'Check your licence details',
      nameOnLicence: request.session.holderName,
      licenceDOB: request.session.dateOfBirth,
      email: request.session.email,
      mobile: request.session.mobile,
      address: request.session.Address,
      licenceType: request.session.licenceType,
      numberOfRods: request.session.numberOfRods,
      licenceLength: request.session.licenceLength,
      startDate: request.session.startDate,
      startMonth: request.session.startMonth,
      startYear: request.session.startYear,
      startText: request.session.startText,
      startTime: request.session.startTime,
      cost: request.session.cost,
      totalCost: totalCost,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasDisabledConcession: request.session.hasDisabledConcession,
      hasNINumber: request.session.hasNINumber,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      isSalmon: request.session.isSalmon,
      isCoarse: request.session.isCoarse,
      licenceNumber: request.session.licenceNumber,
      isUpgrade: request.session.isUpgrade,
      isUpgradeLength: request.session.isUpgradeLength,
      changeDetails: request.session.changeDetails,
      noContact: request.session.noContact,
      isMultibuy: request.session.multibuy,
      user1 : global.users[0],
      user2 : global.users[1],
      user3 : global.users[2],
      user4 : global.users[3],
      count : global.users.length
    })
  },
  post: function (request, reply) {




    if (request.session.multibuy === true) {
        if (users.length >= 3) {

          var user = JSON.parse(JSON.stringify(request.session))
          global.users.push(user)
          // Clear session
          request.session = {}
          
          return reply.redirect('terms-conditions')
        } else {
          return reply.redirect('add-another')
        }
    } else {
      return reply.redirect('terms-conditions')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/summary',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/summary',
  config: {
    handler: handlers.post
  }
}]
