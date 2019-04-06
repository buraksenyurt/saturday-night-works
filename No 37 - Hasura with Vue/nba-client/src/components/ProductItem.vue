<template>
  <div :key="product.productId" class="card w-75">
    <div class="card-header">
      <p class="card-text">{{product.description}}</p>
    </div>
    <div class="card-body text-left">
      <h6 class="card-subtitle mb-2 text-muted">{{product.listPrice}} Lira</h6>
      <h6 class="card-subtitle mb-2">'{{product.category.title}}' kategorisinden</h6>
    </div>
    <div class="card-footer text-right">
      <a href="#" class="btn btn-primary">Sepete Ekle</a>
    </div>
      <hr/>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"]
};
</script>
