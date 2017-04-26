
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-two', {
      pageTitle: 'How can we send you your licence details?',
    })
  },
  post: function (request, reply) {
      return reply.redirect('contact-two-b')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-two',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-two',
  config: {
    handler: handlers.post
  }
}]
