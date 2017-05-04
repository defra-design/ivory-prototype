const handlers = {
  get: function (request, reply) {
    return reply.view('add-another', {
      pageTitle: 'Do you want to buy another licence?',
      errorMessage: 'Tell us if you want to buy another licence',
      items: {
        one: {
          text: 'Yes',
          name: 'multibuy',
          id: 'yes',
        },
        two: {
          text: 'No',
          name: 'multibuy',
          id: 'no',
        },
      }
    })
  },
  post: function (request, reply) {
    var multibuy = request.payload.multibuy
    if (multibuy === 'yes') {

      // Make a copy of the current user and save it in our new array.
      var user = JSON.parse(JSON.stringify(request.session))
      global.users.push(user)

      var user1 = global.users[0]
      var user2 = global.users[1]
      var user3 = global.users[2]
      var user4 = global.users[3]

      var count = global.users.length

      // Clear session
      request.session = {}




    //
    // //  To get a saved user:
    //   var user1 = global.users[0]
    //   var user2 = global.users[1]
    //
    //   //To set the session to a saved user:
    //   request.session = user1
    //
    //   //To count the number of saved users:
    //   var count = global.users.length

    //return reply(user1)
      return reply.redirect('licence-length')
    } else {
      return reply.redirect('terms-conditions')
    }
  }
}



module.exports = [{
  method: 'GET',
  path: '/buy/add-another',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/add-another',
  config: {
    handler: handlers.post
  }
}]
