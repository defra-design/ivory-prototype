
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-five', {
      pageTitle: 'How would you like to receive your licence details?',
    })
  },
  post: function (request, reply) {
      return reply.redirect('')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-five',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-five',
  config: {
    handler: handlers.post
  }
}]
