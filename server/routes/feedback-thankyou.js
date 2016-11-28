module.exports = [{
  method: 'GET',
  path: '/feedback-thankyou',
  config: {
    handler: function (request, reply) {
      return reply.view('feedback-thankyou', {
        pageTitle: 'Thank you for your feedback',
      })
    }
  }
},
{
  method: 'POST',
  path: '/feedback-thankyou',
  config: {
    handler: function (request, reply) {
      return reply.redirect('/')
    }
  }
}]
