const handlers = {
  get: function (request, reply) {

    // 1 Day
    if (request.session.licenceLength === '1-day') {
      request.session.salmonCost = "£12.00"
      request.session.coarseCost = "£6.00"
    }

    // 8 Day
    if (request.session.licenceLength === '8-days') {
      request.session.salmonCost = "£27.00"
      request.session.coarseCost = "£12.00"
    }

    // 12 Months
    if (request.session.licenceLength === '12-months') {
      if (request.session.age  > 65 || request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
        request.session.salmonCost = "£54.00"
        request.session.coarseCost = "£20.00"
      } else {
        request.session.salmonCost = "£82.00"
        request.session.coarseCost = "£30.00"
      }
    }

    if (request.session.isJunior === true) {
      request.session.cost = "£00.00"
    }

    // // Upgrade costs
    // if (request.session.isUpgrade === true) {
    //    if (request.session.licenceNumber === 'B7A711') {
    //        request.session.cost = '£52.00 (save £30.00)'
    //    } else if (request.session.licenceNumber === 'B7A712') {
    //        request.session.cost = '£15.00 (save £30.00)'
    //    } else if (request.session.licenceNumber === 'B7A713') {
    //      if (request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
    //        request.session.cost = '£27.00 (save £27.00)'
    //      } else {
    //        request.session.cost = '£55.00 (save £27.00)'
    //      }
    //    }
    // }

    return reply.view('licence-type', {
      pageTitle: 'What type of fishing licence do you want?',
      errorMessage: 'Choose a licence type',
      cost: request.session.cost,
      salmonCost: request.session.salmonCost,
      coarseCost: request.session.coarseCost,
      licenceLength: request.session.licenceLength,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasNINumber: request.session.hasNINumber,
      isFull: request.session.isFull,
      concession: request.session.concession,
      items: {
        one: {
          text: 'Trout and coarse',
          name: 'licence_type',
          id: 'Trout and coarse',
          value: 'Trout_and_coarse',
          // selectedText: request.session.cost,
        },
        two: {
          text: 'Salmon and sea trout',
          subText: 'includes trout and coarse fish',
          name: 'licence_type',
          id: 'Salmon and sea trout',
          value: 'Salmon_and_sea_trout',
          // selectedText: request.session.cost,
        },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    request.session.licenceType = request.payload.licence_type


    // var april = new Date("April 01, 2016 11:13:00");
    // var april = Date.parse("April 01, 2017");
    // var licenceStart = Date.parse(request.session.date);

    // Rods
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.numberOfRods ='1 rod (or up to 3 rods for coarse fish)'
        request.session.isSalmon = true
        request.session.isCoarse = false;
      } else if (request.session.licenceType === 'Trout and coarse') {
          request.session.numberOfRods = 'Up to 2 rods'
          request.session.isCoarse = true
          request.session.isSalmon = false
      }


        if (returnURL) {
          if (request.session.licenceLength === '12-months' && request.session.licenceType === 'Trout and coarse') {
            return reply.redirect('number-of-rods?returnUrl=/buy/summary')
          } else {
            return reply.redirect(returnURL)
          }
        } else {
          if (request.session.isJunior === true) {
            if (request.session.licenceType === 'Trout and coarse') {
              return reply.redirect('number-of-rods')
            } else {
              return reply.redirect('contact')
            }
          } else {
            if (request.session.licenceType === 'Trout and coarse' && request.session.licenceLength === '12-months') {
              return reply.redirect('number-of-rods')
            } else {
              return reply.redirect('licence-start-option')
              }
          }
        }



  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/licence-type',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-type',
  config: {
    handler: handlers.post
  }
}]
