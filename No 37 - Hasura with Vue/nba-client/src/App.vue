<template>
  <div id="app">
    <h2 class="text-left">Basketbol Ürünleri</h2>
    <product-list/>
  </div>
</template>

<script>
/*
  Ana bileşen içerisinde kullanılan alt bileşenlerin import edilmesi
*/
import ProductList from "./components/ProductList.vue";

export default {
  name: "app",
  components: {
    ProductList
  }
};
</script>
