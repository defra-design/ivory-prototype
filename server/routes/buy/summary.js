const handlers = {
  get: function (request, reply) {




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



    // is salmon
    if (request.session.licenceType === 'Salmon and sea trout') {
      request.session.isSalmon = true;
    }

    // is salmon
    if (request.session.licenceType === 'Trout and coarse') {
      request.session.isCoarse = true;
    }



    // Add variables for senior and concession if after April
    // var april = Date.parse("April 01, 2017");
    // var licenceStart = Date.parse(request.session.date);


      if (request.session.age > 65) {
        request.session.isSenior = true
        request.session.concession = true
      } else if (request.session.age < 17) {
        request.session.licenceLength = '12 months'
        request.session.isJunior = true
        request.session.concession = true
      }


    //End dates
    var options = {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    };

    if (request.session.startDate === "April 1st 2017") {
      request.session.endDate = "April 1st 2018"
    } else {
      if (request.session.licenceLength === '1-day') {
        var tomorrow = new Date(Date.parse(request.session.date));
        tomorrow.setDate(tomorrow.getDate() + 1);
        request.session.endDate = tomorrow.toLocaleDateString("en-us", options)
      } else if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)') {
        var eightDays = new Date(Date.parse(request.session.date));
        eightDays.setDate(eightDays.getDate() + 8);
        request.session.endDate = eightDays.toLocaleDateString("en-us", options)
      } else {
        var threeSixFiveDays = new Date(Date.parse(request.session.date));
        threeSixFiveDays.setDate(threeSixFiveDays.getDate() + 365);
        request.session.endDate = threeSixFiveDays.toLocaleDateString("en-us", options)
      }
    }

    // Calculate cost
    // 1 Day
    if (request.session.licenceLength === '1-day') {
      if (request.session.licenceType === 'Trout and coarse' && request.session.oldPrice === true) {
        request.session.cost = "£3.75"
      } else if (request.session.licenceType === 'Trout and coarse') {
        request.session.cost = "£6.00"
      } else if (request.session.licenceType === 'Salmon and sea trout' && request.session.oldPrice === true) {
        request.session.cost = "£8.00"
      } else if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = "£12.00"
      }
    }

    // 8 Day
    if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)') {
      if (request.session.licenceType === 'Trout and coarse' && request.session.oldPrice === true) {
        request.session.cost = "£10.00"
      } else if (request.session.licenceType === 'Trout and coarse') {
        request.session.cost = "£12.00"
      } else if (request.session.licenceType === 'Salmon and sea trout' && request.session.oldPrice === true) {
        request.session.cost = "£23.00"
      } else if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = "£27.00"
      }
    }

    // 365 Day
    if (request.session.licenceLength === '365-days') {
        request.session.isFull = true;
      // Junior
      if (request.session.age < 17 ) {
        request.session.cost = "00.00"
      }
      // Salmon
      if (request.session.licenceType === 'Salmon and sea trout') {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = "£54.00"
        } else {
          request.session.cost = "£82.00"
        }
      }
      // Coarse
      if (request.session.licenceType === 'Trout and coarse') {
        if(request.session.numberOfRods === '3 rods') {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£30.00"
          } else {
            request.session.cost = "£45.00"
          }
        } else {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£20.00"
          } else {
            request.session.cost = "£30.00"
          }
        }
      }
    }

    // 12 Months
    if (request.session.licenceLength === '12 months') {
        request.session.isFull = true;
      // Junior
      if (request.session.age < 17 ) {
        request.session.cost = "00.00"
      }
      // Salmon
      if (request.session.licenceType === 'Salmon and sea trout') {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = "£54.00"
        } else {
          request.session.cost = "£82.00"
        }
      }
      // Coarse
      if (request.session.licenceType === 'Trout and coarse') {
        if(request.session.numberOfRods === '3 rods') {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£30.00"
          } else {
            request.session.cost = "£45.00"
          }
        } else {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£20.00"
          } else {
            request.session.cost = "£30.00"
          }
        }
      }
    }

    // Upgrade costs
    if (request.session.isUpgrade === true) {
       if (request.session.licenceNumber === '495969798') {
           request.session.cost = '£52.00'
       } else if (request.session.licenceNumber === '497804364') {
           request.session.cost = '£15.00'
       } else if (request.session.licenceNumber === '697989192') {
         if (request.session.hasBlueBadge === true) {
           request.session.cost = '£27.00'
         } else {
           request.session.cost = '£55.00'
         }
       }
    }


    if (request.session.licenceLength === '365-days') {
      request.session.licenceLength = '12 months'
    }


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
      startText: request.session.startText,
      startTime: request.session.startTime,
      startAge: request.session.startAge,
      cost: request.session.cost,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasNINumber: request.session.hasNINumber,
      isFull: request.session.isFull,
      concession: request.session.concession,
      isSalmon: request.session.isSalmon,
      isCoarse: request.session.isCoarse,
      licenceNumber: request.session.licenceNumber,
      isUpgrade: request.session.isUpgrade,
      changeDetails: request.session.changeDetails
    })
  },
  post: function (request, reply) {
    return reply.redirect('terms-conditions')
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
