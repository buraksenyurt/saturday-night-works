<template>
  <div id="app">
    <h2 class="text-left">Yeni Ürün</h2>
    <!-- Bileşenleri altalta dizdik -->
    <product-add/>
    <h2 class="text-left">Basketbol Ürünleri</h2>
    <product-list/>
  </div>
</template>

<script>
/*
  Ana bileşen içerisinde kullanılan alt bileşenlerin import edilmesi
*/
import ProductList from "./components/ProductList.vue";
import ProductAdd from "./components/ProductAdd.vue";

export default {
  name: "app",
  components: {
    ProductList,
    ProductAdd
  }
};
</script>