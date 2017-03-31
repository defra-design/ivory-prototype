const handlers = {
  get: function (request, reply) {
    //return reply.redirect('buy/product-type')
    return reply.redirect('buy/licence-length')
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy',
  config: {
    handler: handlers.get
  }
}]
