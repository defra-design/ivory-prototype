const handlers = {
  get: function (request, reply) {
    return reply.view('data-protection', {
      pageTitle: 'Data protection notice',
    })
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/data-protection',
  config: {
    handler: handlers.get
  }
}]
