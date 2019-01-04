<template>
  <div>
    <div class="col-md-12" v-show="contactList.length>0">
      <h3>Tüm bağlantılarım</h3>
      <div class="row mrb-10" v-for="contact in contactList" :key="contact.id">
        <div class="card bg-light border-dark mb-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ contact.fullname }}</h5>
            <p class="card-text">{{ contact.phoneNumber }}</p>
            <p class="card-text">{{ contact.location }}</p>
            <p class="cart-text">{{ contact.birtdate }}</p>
            <span v-on:click="deleteContact(contact._id)" class="btn btn-primary">Sil</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bus from "./../bus.js";

export default {
  data() {
    return {
      contactList: [] //modelimizin verisini içerecek array elemanı
    };
  },
  created: function() {
    // başlangıçta çalışacak fonksiyonumuzda iki işlem yapılıyor
    this.getAllContacts(); // tüm bağlantıları al
    this.listenToBus(); // ve diğer bileşenden yeni eklenecek bağlantıları alabilmek için eventBus'ı dinlemeye başla
  },
  methods: {
    getAllContacts() {
      let uri = "http://localhost:5003/api"; // klasik axios ile web api'mize HTTP Get talebi gönderdik
      axios.get(uri).then(response => {
        this.contactList = response.data; //dönen veriyi contactList dizisine aldık
        console.log(this.contactList);
      });
    },
    deleteContact(id) {
      // bir arkadaşımızı silmek istediğimizde
      let uri = "http://localhost:5003/api/" + id;
      axios.delete(uri); // HTTP Delete talebini gönderiyoruz. id parametresi Mongo'nun ürettiği Guid
      this.getAllContacts(); // listemizi tazeleyelim
    },
    listenToBus() {
      bus.$on("refresh", $event => {
        this.getAllContacts(); // Diğer bileşen tarafından yeni bir bağlantı eklenirse dinlediğimiz refresh isimli hattan bunu yakalayabileceğiz. Bu uyarı sonrası bağlantı listesini tekrar çekiyoruz
      });
    }
  }
};
</script>