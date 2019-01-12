// Sorguları işleten modülümüz. 
// Pek tabii sözde laureate veritabanını kullanıyor
// Veritabanı olan JSON dosyası array olarak belleğe yüklenir. Dolayısıyla uygulama sonlandığında ilgili değişiklikler kalıcı olarak dosyaya yazılmadıysa, kaybolacaklardır.
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
    },
    // Yıllara göre nobel ödülü sahiplerinin listesini verir
    laureatesByYear:(parent,{year},context,info)=>{
      // filter ile tüm laureates elemanlarında sorgu yapıyoruz.
      // year bilgisi prizes dizisinde olduğu için some fonksiyonundan yararlandık
      var result=laureates.filter(l=>l.prizes.some(p=>p.year==year));
      //console.log(result);
      return result;
    }
  },
  Mutation:{ // CUD operasyonlarının ele alındığı nesne
    // Yeni bir nobel sahibi eklemek için
    // input parametresinin şeması schema.graphql içindeki createLaurate nesnesinde belirtildi
    createLaureate:(parent,input, context,info)=>{
      //console.log(input);
      input.prizes=[];
      laureates.push(input);
      return input;
    },
    // ödül ekleyen metodumuz
    addPrize:(parent,input,context,info)=>{
      //console.log(input.year);
      var laureate=laureates.find(l=>l.id===input.id);
      //console.log(laureate);
      if(laureate)
      {
        laureate.prizes.push(input);
        return laureate;
      }
      else{
        return {};
      }      
    },
    deleteLaureate:(parent,{id},context,info)=>{
      // önce sileceğimiz kayıt var mı indeksini bulalım
      var index=laureates.findIndex(l=>l.id===id);
      if(index!=-1) //bulunduysa
      {
        //çıkart
        var deleted=laureates.splice(index,1);
        return deleted[0];
      }
      else
        return {};
    }
  }
};

export default resolvers;