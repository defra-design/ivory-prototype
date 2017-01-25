module.exports = [{
  method: 'GET',
  path: '/upgrade-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('upgrade-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/upgrade-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
