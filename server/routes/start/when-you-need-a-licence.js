const handlers = {
  get: function (request, reply) {
    return reply.view('when-you-need-a-licence.html',  null, { layout: 'layout-start'})
  }
}

module.exports = [{
  method: 'GET',
  path: '/start/when-you-need-a-licence.html',
  config: {
    handler: handlers.get
  }
}
]
