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

    // 1 Day
    if (request.session.licenceLength === '1-day' || request.session.licenceLength === '1 day') {
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = "£12.00"
      } else {
        request.session.cost = "£6.00"
      }
    }

    // 8 Day
    if (request.session.licenceLength === '8-days' || request.session.licenceLength === '8 days') {
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = "£27.00"
      } else {
        request.session.cost = "£12.00"
      }
    }

    // 12 Months
    if (request.session.licenceLength === '12-months' || request.session.licenceLength === '365-days' || request.session.licenceLength === '12 months') {
        request.session.isFull = true;
      // Junior
      if (request.session.age < 17 ) {
        request.session.cost = "00.00"
      }
      // Salmon
      if (request.session.licenceType === 'Salmon and sea trout') {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = "£54.00"
        } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
          request.session.cost = "£54.00"
        } else {
          request.session.cost = "£82.00"
        }
      } else {
        if(request.session.numberOfRods === 'Up to 3 rods') {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£30.00"
          } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
            request.session.cost = "£30.00"
          } else {
            request.session.cost = "£45.00"
          }
        } else {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£20.00"
          } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
            request.session.cost = "£20.00"
          } else {
            request.session.cost = "£30.00"
          }
        }
      }
    }


    if (request.session.isJunior === true) {
      request.session.cost = "£00.00"
    }

    // Upgrade costs
      if (request.session.isUpgrade === true || request.session.isUpgradeLength === true) {
         if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711') {
             if(request.session.numberOfRods === 'Up to 3 rods') {
               request.session.cost = '£10.00'
             } else {
               request.session.cost = '£34.00'
             }
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711B') {
           if(request.session.numberOfRods === 'Up to 3 rods') {
             //request.session.cost = '£15.00 (save £15.00)'
             request.session.cost = '£15.00'
           } else {
             //request.session.cost = '£52.00 (save £28.00)'
             request.session.cost = '£52.00'
           }

           }else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A712') {
             request.session.cost = '£82.00'

         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A713' || request.session.licenceNumber === '00010418-3WC3JDS-B7A713B') {

           if (request.session.isRenew === true) {
             request.session.cost = '£12.00'
           } else if (request.session.hasBlueBadge === true || request.session.hasNINumber === true || request.session.age > 65) {

                if(request.session.numberOfRods === 'Up to 3 rods') {
                  request.session.cost = '£18.00 (save £12.00)'
                } else {
                  request.session.cost = '£8.00 (save £12.00)'
                }

              } else {
                if(request.session.numberOfRods === 'Up to 3 rods') {
                  request.session.cost = '£33.00 (save £12.00)'
                } else {
                  request.session.cost = '£18.00 (save £12.00)'
                }
              }

            }


         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A714') {
             request.session.cost = '£70.00 (save £12.00)'
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A715') {
             request.session.cost = '£24.00 (save £6.00)'
         }



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
    })
  },
  post: function (request, reply) {
    if (request.session.multibuy === true) {
      return reply.redirect('add-another')
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
