const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql'); //graphql'den gerekli tip tanımlamalarını aldık
const _ = require('lodash'); // 

const { historyType } = require('./types.js');
let { today } = require('./history-data.js');

// helloWorldQT, sorgu tipimizin adı ve aslında bir GraphQLObjectType nesnesi
const queries = new GraphQLObjectType({
    name: 'Queries', //Ona bir isim verdik
    fields: { // İçinde motto ve history isimli iki alan var. Aslında bunlar sorgu endpoint'leri.
        motto: {
            type: GraphQLString, // bu alanın tipi metinsel
            resolve: function () { // ve sorgulandığında dönecek içeriği ele alan çözümleyici fonksiyon da bu
                return "Bugün harika bir gün :P";
            }
        },
        history: { // bu diğer endpoint'imiz.
            type: historyType, // kendi historyType tipimizi kullanıyoruz
            args: { //argüman listemiz
                number: { type: GraphQLInt } // istemci number değişkenini kullanarak sorgu için parametre aktarabilir
            },
            resolve: function (source,args) { // çağırıldığında devreye girecek fonksiyon
                var result = _.find(today, { id: args.number }); // bugün olanlar listesinden id alanının değerini argüman olarak gelen number'la eşleştirip sonucunu geriye döndürüyoruz
                console.log(result);
                return result;
            }
        }
    }
});

exports.queries = queries;