const handlers = {
  get: function (request, reply) {
    return reply.view('licence-type', {
      pageTitle: 'What fish should your licence cover?',
      errorMessage: 'Choose a licence type',
      items: {
        one: {
          text: 'Trout and coarse',
          name: 'licence_type',
          id: 'Trout and coarse',
          value: 'Trout_and_coarse',
          // selectedText: 'Non-migratory ',
        },
        two: {
          text: 'Salmon and sea trout',
          subText: 'includes trout and coarse fish',
          name: 'licence_type',
          id: 'Salmon and sea trout',
          value: 'Salmon_and_sea_trout',
          // selectedText: 'Migratory',
        },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceType = request.payload.licence_type
    returnURL = request.query.returnUrl

    //var april = new Date("April 01, 2016 11:13:00");
    // var april = Date.parse("April 01, 2017");
    // var licenceStart = Date.parse(request.session.date);


    // // Direct to pre April journey
    // if (april > licenceStart) {
    //   request.session.beforeApril = true
    //   return reply.redirect('licence-short-term-length')
    // } else {
    //   // Jump to contact if junior
    //   if (request.session.startAge < 17) {
    //     if (returnURL) {
    //       return reply.redirect(returnURL)
    //     } else {
    //       return reply.redirect('find-address')
    //     }
    //   } else {
    //     if (returnURL) {
    //       return reply.redirect(returnURL)
    //     } else {
    //     return reply.redirect('licence-length')
    //     //return reply(request.session.startDate + " " +april)
    //     }
    //   }
    // }

    // Rods
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.numberOfRods ='1 rod (or up to 2 rods for trout and coarse fish)'
      } else if (request.session.licenceType === 'Trout and coarse') {
          request.session.numberOfRods = 'Up to 2 rods'
      }


    if (request.session.startAge < 17) {
      request.session.isJunior = true
      request.session.licenceLength = '365-days'
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
        return reply.redirect('contact')
      }
    } else {
      if (returnURL) {
        return reply.redirect(returnURL)
      } else {
      return reply.redirect('licence-length')
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
