exports.options = {
    routePrefix: '/help',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Minions API',
        description: 'Minion ailesi ile ilgili yönetsel işlemler...',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Daha fazla bilgi için buraya gidin'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  }