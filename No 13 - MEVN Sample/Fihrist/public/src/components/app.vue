<template>
  <div id="app">
    <div class="container">
      <div class="row col-md-6 offset-md-3">
        <create-contact></create-contact>
      </div>
    </div>
  </div>
</template>


<script>
import createContact from "./newContact.vue";
export default {
  name: "app",
  data() {
    return {};
  },
  components: { createContact }
};
</script>