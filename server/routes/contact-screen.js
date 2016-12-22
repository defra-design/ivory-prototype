module.exports = [{
  method: 'GET',
  path: '/contact-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('contact-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/contact-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
