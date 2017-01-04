const handlers = {
  get: function (request, reply) {
    return reply.view('download-option-quick', {
      pageTitle: 'You do not need a physical licence',
      errorMessage: 'Choose a licence type',
      items: {
        one: {
          text: 'Trout and coarse',
          name: 'licence_type',
          id: 'Trout and coarse',
          value: 'Trout_and_coarse',
          // selectedText: 'Non-migratory ',
        },
        two: {
          text: 'Salmon and sea trout',
          subText: 'includes trout and coarse fish',
          name: 'licence_type',
          id: 'Salmon and sea trout',
          value: 'Salmon_and_sea_trout',
          // selectedText: 'Migratory',
        },
      }
    })
  },
  post: function (request, reply) {
      //return reply.redirect('summary')
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/download-option-quick',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/download-option-quick',
  config: {
    handler: handlers.post
  }
}]
