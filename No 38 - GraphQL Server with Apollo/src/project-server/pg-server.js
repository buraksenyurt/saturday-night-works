const { ApolloServer, gql } = require('apollo-server');

//  postgresql kullanabilmek için gerekli modülü ekledik
const db = require('pg').Pool;
// connection string tanımı gibi düşünebiliriz.
const mngr = new db({
    user: 'scott',
    host: 'localhost',
    database: 'thoughtworld',
    password: 'Tiger',
    port: 5432
});

const typeDefs = gql`
    type Task{
        id:Int
        title:String
        description:String
        size:String
    }
    type DeleteResult{
        DeletedId:Int,
        Result:String
    }
    type Query{
        AllTasks:[Task]
        TaskById(id:Int!): Task
    }
    input TaskInput {
        title:String
        description:String
        size:String
    }
    input UpdateInput {
        id:Int!
        title:String
        description:String
        size:String
    }
    type Mutation{
        Insert(payload:TaskInput) : Task
        Update(payload:UpdateInput):Task
        Delete(id:Int!):DeleteResult
    }
`;

/*
    sorguyu göndermek için query metodundan yararlanıyoruz.
    geriye rows nesnesini döndürmekteyiz.

    query metodunun dönüşünü resolvers'tan çıkartabilmek için senkronize etmem gerekti.
    Bu nedenle async-await desenini kullandım.
*/
const resolvers = {
    Query: {
        AllTasks: async () => {
            const res = await mngr.query("SELECT * FROM tasks ORDER BY ID;")
            // console.log(res);
            if (res)
                return res.rows;
        },
        TaskById: async (root, { id }) => {
            const res = await mngr.query("SELECT * FROM tasks WHERE id=$1", [id]);
            // console.log(res);
            return res.rows[0];
        }
    },
    Mutation: {
        /*
        Yeni bir görevi eklemek için kullandığımız operasyonu da 
        async await bünyesinde değerlendirdim.
        Sorguya dikkat edilecek olursa, Insert parametrelerini 
        $1, $2 benzeri placeholder'lar ile gönderiyoruz.
        Sorgu sonucu elde edilen id değerini payload'a yükleyip geri döndürüyoruz.

        Bazı sorgularda RETURNING * kullandım. 
        Bunu yapmadığım zaman sonuç değişkenleri boş verilerle dönüyordu.
        Sebebini öğrenene ve alternatif bir yol bulana kadar bu şekilde ele alacağım.
            
        */
        Insert: async (root, { payload }) => {
            const res = await mngr.query('INSERT INTO tasks (title,description,size) VALUES ($1,$2,$3) RETURNING *',
                [payload.title, payload.description, payload.size]);
            id = res.rows[0].id;
            payload.id = id;
            return payload;
        },
        Update: async (root, { payload }) => {
            const res = await mngr.query('UPDATE tasks SET title=$1,description=$2,size=$3 WHERE ID=$4 RETURNING *', [payload.title, payload.description, payload.size, payload.id]);
            // console.log(res);
            return res.rows[0];

        },
        Delete: async (root, { id }) => {
            const res = await mngr.query('DELETE FROM tasks WHERE ID=$1', [id]);
            // console.log(res);
            return { DeletedId: id, Result: "Silme işlemi başarılı" };
        }
    }
};

const houston = new ApolloServer({ typeDefs, resolvers });
houston.listen({ port: 4445 }).then(({ url }) => {
    console.log(`Houston ${url} kanalı üzerinden dinlemede`);
});