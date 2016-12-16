module.exports = [{
  method: 'GET',
  path: '/landing.html',
  config: {
    handler: function (request, reply) {
      return reply.view('landing', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/landing.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
