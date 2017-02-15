const handlers = {
  get: function (request, reply) {



      if (request.session.age  > 65 || request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
        request.session.Rod2Cost = "£20.00"
        request.session.Rod3Cost = "£30.00"
      } else {
        request.session.Rod2Cost = "£30.00"
        request.session.Rod3Cost = "£45.00"
      }

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
      concession: request.session.concession,
      Rod2Cost: request.session.Rod2Cost,
      Rod3Cost: request.session.Rod3Cost,
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
      if (request.session.disabilityChecked === true) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('disability?returnUrl=/buy/summary')
      }
    } else {
      if (request.session.isUpgrade === true) {
        return reply.redirect('summary')
      } else {
        if (request.session.isJunior === true) {
            return reply.redirect('contact')
          } else {
            return reply.redirect('licence-start-option')
        }
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
