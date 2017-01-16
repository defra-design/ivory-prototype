
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-one', {
      pageTitle: 'How would you like to receive your licence details?',
      errorMessage: 'Choose a licence type',
    })
  },
  post: function (request, reply) {
      return reply.redirect('')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-one',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-one',
  config: {
    handler: handlers.post
  }
}]
