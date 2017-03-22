const handlers = {
  get: function (request, reply) {


      if (request.session.isUpgrade === true || request.session.isUpgradeLength === true) {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
          request.session.Rod2Cost = "£8.00"
          request.session.Rod3Cost = "£18.00"
        } else {
          request.session.Rod2Cost = "£18.00"
          request.session.Rod3Cost = "£33.00"
        }
      } else {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
          request.session.Rod2Cost = "£20.00"
          request.session.Rod3Cost = "£30.00"
        } else {
          request.session.Rod2Cost = "£30.00"
          request.session.Rod3Cost = "£45.00"
        }
      }

      if (request.session.hasBlueBadge === true && request.session.hasNINumber === true) {
        request.session.isConcession = true
      }

      if (request.session.isJunior === true) {
          request.session.Rod2Cost = "Free"
          request.session.Rod3Cost = "Free"
      }

      // if (request.session.licenceNumber === '00010418-3WC3JDS-B7A713') {
      //   request.session.isSenior = true
      //   request.session.isConcession = true
      //   request.session.Rod2Cost = "£8.00"
      //   request.session.Rod3Cost = "£18.00"
      // }

    return reply.view('number-of-rods', {
      pageTitle: 'How many rods would you like to licence?',
      errorMessage: 'Select number of rods',
      cost: request.session.cost,
      selectedText: request.session.cost,
      licenceLength: request.session.licenceLength,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasNINumber: request.session.hasNINumber,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      Rod2Cost: request.session.Rod2Cost,
      Rod3Cost: request.session.Rod3Cost,
      isUpgrade: request.session.isUpgrade,
      items: {
        one: {
          text: 'Up to 2 rods',
          name: 'number_of_rods',
          id: 'Up to 2 rods',
          // selectedText: request.session.cost,
        },
        two: {
          text: 'Up to 3 rods',
          name: 'number_of_rods',
          id: 'Up to 3 rods',
        }
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    request.session.numberOfRods = request.payload.number_of_rods
    if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      request.session.rodsChecked === true
        if (request.session.isJunior === true) {
          return reply.redirect('contact')
        } else {
          return reply.redirect('licence-start-option')
      }
    }

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/number-of-rods',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/number-of-rods',
  config: {
    handler: handlers.post
  }
}]
