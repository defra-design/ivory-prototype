
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-two-b', {
      pageTitle: 'Would you like to receive fishing news and updates?',
    })
  },
  post: function (request, reply) {
      return reply.redirect('')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-two-b',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-two-b',
  config: {
    handler: handlers.post
  }
}]
