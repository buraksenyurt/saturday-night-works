// Sorguları işleten modülümüz. Pek tabii laureate veritabanını kullanıyor
import { laureates  } from "./laureate";

const resolvers = {
  Query: {
    // ilk sorgumuz tüm nobel ödülü sahiplerini döndürmekte
    // allLaureates aslında schema.graphql içerisindeki Query tipinde tanımlı
    // burayı, sözleşmenin uygulandığı fonksiyon olarak düşünebiliriz
    allLaureates: (parent, args, context, info) => {
      return laureates;
    },
    // ikinci sorgumuz ise id değerine göre arama yapıp sonucunu döndürmekte
    oneLaureate: (parent, { id }, context, info) => {
      return laureates.find(l => l.id === id);
    }
  }
};

export default resolvers;