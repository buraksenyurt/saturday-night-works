const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = require('graphql');

// historyType'ı tanımlıyoruz
// Bu tip grapQL sorgularımızdan birisinde kullanılıyor
// Günün olayları listesini yazdırdığımız yerde
historyType = new GraphQLObjectType({
    name: 'today',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        category: { type: GraphQLString }
    }
});

exports.historyType = historyType;