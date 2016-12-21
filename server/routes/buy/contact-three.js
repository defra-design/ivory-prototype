
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-three', {
      pageTitle: 'How would you like to save your licence details?',
    })
  },
  post: function (request, reply) {
      return reply.redirect('')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-three',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-three',
  config: {
    handler: handlers.post
  }
}]
