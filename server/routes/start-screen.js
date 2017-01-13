module.exports = [{
  method: 'GET',
  path: '/start-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('start-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/start-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
