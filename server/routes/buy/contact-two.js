
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-two', {
      pageTitle: 'How would you like to receive your licence confirmation?',
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
