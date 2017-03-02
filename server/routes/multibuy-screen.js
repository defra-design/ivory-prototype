module.exports = [{
  method: 'GET',
  path: '/multibuy-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('multibuy-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/multibuy-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
