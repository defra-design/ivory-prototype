const handlers = {
  get: function (request, reply) {
    return reply.view('disability', {
      pageTitle: 'Do you receive Disability Living Allowance or Personal Independence Payment or hold a Blue Badge?',
      pageText: 'We will use this information to find out if you are eligible for a disabled concession.',
      errorMessage: 'Tell us if you claim Disability Living Allowance, Personal Independence Payment or hold a Blue Badge',
      items: {
        one: {
          text: 'Yes',
          name: 'disability',
          id: 'yes',
        },
        two: {
          text: 'No',
          name: 'disability',
          id: 'no',
        },
      }
    })
  },
  post: function (request, reply) {
    var disability = request.payload.disability
    returnURL = request.query.returnUrl

    if (disability === 'no') {
      return reply.redirect('find-address')
    } else {
      request.session.hasBlueBadge = true
      request.session.concession = true
      return reply.redirect('disability-proof')
    }

    // if (returnURL) {
    //   return reply.redirect(returnURL)
    // } else {
    //   return reply.redirect('date-of-birth')
    // }


  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/disability',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/disability',
  config: {
    handler: handlers.post
  }
}]
