module.exports = [{
  method: 'GET',
  path: '/done-screen.html',
  config: {
    handler: function (request, reply) {
      return reply.view('done-screen', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/done-screen.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
