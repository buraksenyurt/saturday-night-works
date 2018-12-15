
exports.addMinionSchema = {
    description: 'Yeni minionlar ekle',
    tags: ['minions'],
    summary: 'Minionlar ailesine yeni bir mini eklemek için',
    body: {
        type: 'object',
        properties: {
            nickname: { type: 'string' },
            age: { type: 'number' },
            gender: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Eklendi',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                nickname: { type: 'string' },
                age: { type: 'number' },
                gender: { type: 'string' },
                __v: { type: 'number' }
            }
        }
    }
}

exports.getAllMinionSchema = {
    description: 'Tüm minionlar',
    tags: ['minions'],
    summary: 'Tüm minionları getirmek için kullanılır',
    response: {
        200: {
            description: 'Liste başarılı bir şekilde çekilir',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                nickname: { type: 'string' },
                age: { type: 'number' },
                gender: { type: 'string' },
                __v: { type: 'number' }
            }
        }
    }
}