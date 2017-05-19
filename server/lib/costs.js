module.exports = {
  getTotalCost: function (request) {
    // if (request.session.cost) {
    //   var totalCost = request.session.cost
    // } else {
    //   var totalCost = 0
    // }

    var totalCost = 0

    for (var i = 0; i < global.users.length; i++) {
      totalCost += global.users[i].cost;
    }

    return totalCost
  },
  applyCosts: function (request) {
    // Prices

    // 1 Day
    if (request.session.licenceLength === '1-day' || request.session.licenceLength === '1 day') {
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = 12.00
      } else {
        request.session.cost = 6.00
      }
    }

    // 8 Day
    if (request.session.licenceLength === '8-days' || request.session.licenceLength === '8 days') {
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = 27.00
      } else {
        request.session.cost = 12.00
      }
    }

    // 12 Months
    if (request.session.licenceLength === '12-months' || request.session.licenceLength === '365-days' || request.session.licenceLength === '12 months') {
        request.session.isFull = true;
      // Junior
      if (request.session.age < 17 ) {
        request.session.cost = 0
        request.session.hasNoCost = true
      }
      // Salmon
      if (request.session.licenceType === 'Salmon and sea trout') {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = 54.00
        } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
          request.session.cost = 54.00
        } else {
          request.session.cost = 82.00
        }
      } else {
        if(request.session.numberOfRods === 'Up to 3 rods') {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = 30.00
          } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
            request.session.cost = 30.00
          } else {
            request.session.cost = 45.00
          }
        } else {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = 20.00
          } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
            request.session.cost = 20.00
          } else {
            request.session.cost = 30.00
          }
        }
      }
    }


    if (request.session.isJunior === true) {
      request.session.cost = 0
      request.session.hasNoCost = true
    }

    // Upgrade costs
      if (request.session.isUpgrade === true || request.session.isUpgradeLength === true) {
         if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711') {
             if(request.session.numberOfRods === 'Up to 3 rods') {
               request.session.cost = 10.00
             } else {
               request.session.cost = 34.00
             }
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711B') {
           if(request.session.numberOfRods === 'Up to 3 rods') {
             //request.session.cost = '£15.00 (save £15.00)'
             request.session.cost = 15.00
           } else {
             //request.session.cost = '£52.00 (save £28.00)'
             request.session.cost = 52.00
           }

           }else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A712') {
             request.session.cost = 82.00

         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A713' || request.session.licenceNumber === '00010418-3WC3JDS-B7A713B') {

           if (request.session.isRenew === true) {
             request.session.cost = 12.00
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
  }
}
