<template>
    <div :key="product.productId">
        <p>{{product.description}}</p>
        <p>{{product.listPrice}}</p>
        <p>{{product.category.title}}</p>
    </div>
</template>

<script>
    export default{
        name:"ProductItem",
        props: ["product"]
    }
</script>
