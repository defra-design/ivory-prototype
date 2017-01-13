module.exports = [{
  method: 'GET',
  path: '/feedback',
  config: {
    handler: function (request, reply) {
      return reply.view('feedback', {
        pageTitle: 'Provide feedback about the "Get a fishing licence" service',
        errorMessage: 'Please choose an option from the list and then select \'Send feedback\'.',
      })
    }
  }
},
{
  method: 'POST',
  path: '/feedback',
  config: {
    handler: function (request, reply) {
      return reply.redirect('feedback-thankyou')
    }
  }
}]
