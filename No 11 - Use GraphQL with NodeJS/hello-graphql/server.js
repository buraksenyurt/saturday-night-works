var express = require('express');
var graphQl = require('express-graphql'); //graphQL sorgularını ele almayı kolaylaştıran modül
var { GraphQLSchema } = require('graphql');
var { queries } = require('./apiquery.js');
var port = 3001;
var app = express();

// Aşşağıdaki graphQl nesne örneklemesi sırasındaki schema değişkenini tanımladık.
// helloWordQT içeriği yukarıdaki tanımlama gereği apiquery.js içerisinden gelecek.
// böylece graphQl adresine gelecek taleplere yönelik sorgu tiplerinin nereden alınacağını belirtmiş olduk.
var schema = new GraphQLSchema({ query: queries });

// /graphql adresi üzerinden gelecek taleplerini karşılayacan graphQl paketini kuruyoruz.
app.use('/graphql', graphQl({
    schema: schema, // Sorgular tek bir adrese geliyor olsalar da, şema tanımlamalarına göre birden fazla endpoint'e dağılabilir ve çeşitli işleri yapabilirler
    graphiql: true, //GraphQL endPoint'lerini test etme işini kolaylaştıracak web arayüzünü etkinleştiriyoruz
}));

app.listen(port);
console.log(`Sunucumuz ${port} nolu porttan hizmettedir...`);