module.exports = [{
  method: 'GET',
  path: '/rod-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('rod-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/rod-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
