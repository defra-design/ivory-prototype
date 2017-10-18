module.exports = [{
  method: 'GET',
  path: '/static-pages.html',
  config: {
    handler: function (request, reply) {
      return reply.view('static-pages', {
      })
    }
  }
},
{
  method: 'POST',
  path: '/static-pages.html',
  config: {
    handler: function (request, reply) {
    }
  }
}]
