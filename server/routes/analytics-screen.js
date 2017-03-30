module.exports = [{
  method: 'GET',
  path: '/analytics-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('analytics-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/analytics-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
