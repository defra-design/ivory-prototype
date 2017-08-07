const handlers = {
  get: function (request, reply) {

    // Set global user variable
    if(!global.users) {
      global.users = []
    }
    
    return reply.view('licence-length-dd', {
      pageTitle: 'What do you want to do?',
      errorMessage: 'Tell us what you want to do',
      items: {
        one: {
          text: 'Buy a new 12-month licence',
          name: 'what_to_do',
          id: 'Buy a new 12-month licence',
          value: 'Buy_a_new_12_month_licence',
        },
        two: {
          text: 'Buy a new 8-day licence',
          name: 'what_to_do',
          id: 'Buy a new 8-day licence',
          value: 'Buy_a_new_8_day_licence',
        },
        three: {
          text: 'Buy a new 1-day licence',
          name: 'what_to_do',
          id: 'Buy a new 1-day licence',
          value: 'Buy_a_new_1_day_licence',
        },
      },
      items2: {
        // three: {
        //   text: 'Renew a licence',
        //   name: 'what_to_do',
        //   id: 'Renew a licence',
        //   value: 'renew_a_licence',
        // },
        four: {
          text: 'Amend a direct debit',
          name: 'what_to_do',
          id: 'Amend a direct debit',
          value: 'Upgrade_a_licence',
        },
      }
    })
  },
  post: function (request, reply) {
    returnURL = request.query.returnUrl
    var whatToDo = request.payload.what_to_do
    
    return reply.redirect('/')
 

  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-length-dd',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-length-dd',
  config: {
    handler: handlers.post
  }
}]
