exports.swaggerOptions = {
    openapi: {
      info: {
        title: 'Minions API',
        description: 'Minion ailesi ile ilgili yönetsel işlemler...',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Daha fazla bilgi için buraya gidin'
      },
      servers: [{ url: 'http://localhost:4005' }]
    }
  }

exports.swaggerUiOptions = {
    routePrefix: '/help'
  }