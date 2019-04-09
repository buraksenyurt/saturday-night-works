<template>
  <!-- Veri girişi için basit bir formumuz var. Input değerlerini v-model niteliklerine verilen isimlerle bileşene bağlıyoruz -->
  <form @submit="submit">
    <fieldset>
      <div class="form-group w-75">
        <input
          class="form-control"
          aria-describedby="descriptionHelp"
          type="text"
          placeholder="Ürün bilgisi"
          v-model="description"
        >
        <small
          id="descriptionHelp"
          class="form-text text-muted"
        >Satışı olan basketbol malzemesi hakkında kısa bir bilgi...</small>
      </div>
      <div class="form-group w-75">
        <input class="form-control" type="number" v-model="listPrice">
        <small id="listPriceHelp" class="form-text text-muted">Ürünün mağaza satış fiyatı</small>
      </div>
      <div class="form-group w-75">
        <input
          class="form-control"
          type="text"
          placeholder="Halledene kadar kategorinin UUID bilgisi :D"
          v-model="categoryId"
        >
      </div>
      <!-- Kategoriyi drop down olarak nasıl ekleyebiliriz? -->
    </fieldset>
    <div class="form-group w-75 text-right">
      <button class="btn btn-success" type="submit">Dükkana Yolla</button>
    </div>
  </form>
</template>

<script>
import gql from "graphql-tag";
//import { InMemoryCache } from "apollo-cache-inmemory";

/*
  Bu veri girişi yapmak için kullanacağımız mutation sorgumuz.
  insert_products'u Hasura tarafında kullanmıştık hatırlarsanız.

  mutation parametrelerini belirlerken veri türlerine dikkat etmemiz lazım.
  Söz gelimi listPrice, Hasura tarafında Numeric tanımlandı. CategoryId değeri
  ise UUID formatında. Buna göre case-sensitive olarak veri tiplerini söylüyoruz.
  Aslında bunu anlamak için numeric! yerine Numeric! yazıp deneyin. HTTP 400
  Bad Request alıyor olmalısınız.
*/
const addNewProduct = gql`
  mutation addProduct(
    $description: String!
    $listPrice: numeric!
    $categoryId: uuid!
  ) {
    insert_products(
      objects: [
        {
          description: $description
          listPrice: $listPrice
          categoryId: $categoryId
        }
      ]
    ) {
      returning {
        productId
      }
    }
  }
`;

export default {
  name: "ProductAdd",
  data() {
    return {
      description: "",
      listPrice: 0,
      categoryId: ""
    };
  },
  apollo: {},
  methods: {
    /*
    form submit edildiği zaman devreye giren metodumuz.
    $data ile formdaki veri içeriğini description, listPrice ve categoryId olarak yakalıyoruz
    */
    submit(e) {
      e.preventDefault();
      const { description, listPrice, categoryId } = this.$data;

      /*
      apollo'nun mutate metodu ile addNewProduct isimli mutation sorgusunu çalıştırıyoruz.
      Sorgunun beklediği değişkenler this.$data ile zaten yakalanmışlardı.
      */
      this.$apollo.mutate({
        mutation: addNewProduct,
        variables: {
          description,
          listPrice,
          categoryId
        },
        refetchQueries: ["ProductList"] // Insert işlemini takiben ürün lstesini tekrardan talep ediyoruz
      });
    }
  }
};
</script>