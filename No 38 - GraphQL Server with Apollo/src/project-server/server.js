const { ApolloServer, gql } = require('apollo-server');

const tasks = []; // İlk denemeler için veri kümesini dummy array olarak tasarlayabiliriz

/*
    Tip tanımlamalarını yaptığımız bu kısım iki önemli parçadan oluşuyor.

    Queries: istemciye sunduğumuz sorgu modelleri
    Schema : veri modelini belirlediğimiz parçalar (Task gibi)

    Task isimli bir veri modelimiz var.
    Ayrıca sundacağımız sorgu modellerini de Query tipinde belirtiyoruz.
    AllTasks tüm task içeriklerini geri döndürürken, TaskById ile Id bazlı olarak
    tek bir Task dönecek.

    Veri manipülasyonu için InputTask modeli tanımlanmış durumda.
    Bu modeli Create, Update, Delete işlemlerine ait Mutation tanımında kullanıyoruz.

    Int değişkeninin Task tipinin tanımlanması dışındaki yerlerde ! ile yazıldığına dikkat edelim.
*/
const typeDefs = gql`
    # Entity modelimiz olarak düşünebiliriz
    type Task{
        id:Int
        title:String
        description:String
        size:String
    }

    # Silme operasyonundan deneme mahiyetinde farklı bir tip döndük
    type DeleteResult{
        DeletedId:Int,
        Result:String
    }
    # Sunduğumuz sorgular
    type Query{
        AllTasks:[Task]
        TaskById(id:Int!): Task
    }
    # Insert ve Update operasyonlarında kullanacağımzı model
    input TaskInput {
        id:Int!
        title:String
        description:String
        size:String
    }
    # CUD operasyonlarına ait tanımlamalar
    # Burada kullanılan parametre adları, Mutation tarafında da aynen kullanılmalıdır
    type Mutation{
        Insert(payload:TaskInput) : Task
        Update(payload:TaskInput):Task
        Delete(id:Int!):DeleteResult
    }
`;

/*
    Asıl verini ele alındığı çözücü tanımı olarak düşünülebilir.
    CRUD operasyonlarının temel işleyişinin yer aldığı, iş kurallarının da
    konulabildiği kısımdır.
    İki alt parçadan oluşmakta. Select tarzı sorgular için bir kısım (Query)
    ve CUD operasyonları için diğer bir kısım (Mutation)
    Şimdilik Array kullanıyoruz ama bunu MongoDB'ye çekmek isterim.
*/
const resolvers = {
    Query: {
        AllTasks: () => tasks,
        TaskById: (root, { id }) => {
            return tasks.filter(t => {
                return t.id === id;
            })[0];
        }
    },
    Mutation: {
        Insert: (root, { payload }) => { // Yeni veri ekleme operasyonu
            //console.log(payload);
            tasks.push(payload);
            return payload;
        },
        Update: (root, { payload }) => { // Güncelleme operasyonu
            // Gelen payload içindeki id değerini kullanarak dizi indisini bul
            var index = tasks.findIndex(t => t.id === payload.id);
            // alanları gelen içerikle güncelle
            tasks[index].title = payload.title;
            tasks[index].description = payload.description;
            tasks[index].size = payload.size;
            // güncel task bilgisini geri döndür
            return tasks[index];
        },
        Delete: (root, { id }) => { // id üzerinde silme işlemi operasyonu
            tasks.splice(tasks.findIndex(t => t.id === id), 1);
            return { DeletedId: id, Result: "Silme işlemi başarılı" };
        }
    }
};

/*
    ApolloServer nesnesini örnekliyoruz.
    Bunu yaparken schema, query ve resolver bilgierini de veriyoruz.
    Ardından listen metodunu kullanarak sunucuyu etkinleştiriyoruz.
    Varsayılan olarak 4000 numaralı port üzerinde yayın yapar.
*/
const houston = new ApolloServer({ typeDefs, resolvers });
houston.listen({ port: 4444 }).then(({ url }) => {
    console.log(`Houston ${url} kanalı üzerinden dinlemede`);
});