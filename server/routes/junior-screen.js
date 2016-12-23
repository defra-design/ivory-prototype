module.exports = [{
  method: 'GET',
  path: '/junior-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('junior-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/junior-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
