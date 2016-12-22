
const handlers = {
  get: function (request, reply) {
    return reply.view('contact-four', {
      pageTitle: 'Can we contact you via Email or Text message?',
    })
  },
  post: function (request, reply) {
      return reply.redirect('')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/contact-four',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/contact-four',
  config: {
    handler: handlers.post
  }
}]
