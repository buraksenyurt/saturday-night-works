<template>
  <div id="app">
    <div class="container">
      <div class="row col-md-6 offset-md-3">
        <create-contact></create-contact>
        <!-- createContact bileşeni buraya yerleşecek diğeri de aşağıya -->
        <contacts></contacts>
      </div>
    </div>
  </div>
</template>


<script>
import createContact from "./newContact.vue"; // yeni bağlantı eklediğimiz bileşeni aldık
import contacts from "./contacts.vue"; // contact bileşenini aldık
export default {
  name: "app",
  data() {
    return {};
  },
  components: { createContact, contacts } // bileşenlerimizi tanıttık
};
</script>