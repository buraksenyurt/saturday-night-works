<template>
  <div>
    <!--
      products dizisindeki her bir ürün için product-item öğesi ekliyoruz.
      Bu öğe bir ProductItem bileşeni esasında
      -->
    <product-item v-for="product in products" :key="product.productId" :product="product"></product-item>
  </div>
</template>

<script>
/*
  div içerisinde kullandığımız product-item elementi için ProductItem bileşenini eklememi gerekiyor.
  gql ise GraphQL sorgularını çalıştırabilmemiz için gerekli
*/
import ProductItem from "./ProductItem";
import gql from "graphql-tag";

/*
  GraphQL sorgumuz.
  Tüm ürün listeini, kategori adları ile birlikte getirecek
*/
const selectAllProducts = gql`
  query getProducts{
  products{
    productId
    description
    listPrice
    category{
      title
    }
  }
}
`;

/*
  Sorguyu GraphQL API'sine gönderebilmek için apollo'ya ihtiyacımız var.
  products dizisini query parametresine verilen değişken ile çekiyoruz.
*/
export default {
  name: "ProductList",
  components: { ProductItem }, // Sayfada bu bileşeni kullandığımız için eklendi
  data() {
    return {
      products: []
    };
  },
  apollo: {
    products: {
      query: selectAllProducts
    }
  }
};
</script>