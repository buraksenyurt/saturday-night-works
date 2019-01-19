<template>
  <div id="app">
    <h2>Bölüm adını yazar mısın?</h2>
    <section>
      <input type="text" v-model="query">
      <button :disabled="!query.length" @click="findEpisode">Göster</button>
      <!-- butona basılınca findEpisode metodu çağırılacak -->
    </section>
    <section v-if="error">
      <!-- error değişkeni true olarak set edilmişse bir şeyler ters gitmiştir -->
      <i>Sanırım bölüm bulunamadı ya da bir şeyler ters gitti</i>
    </section>
    <section v-if="!error">
      <!-- Aranan veri bulunduysa -->
      <h1>{{name}} ({{season}}/{{number}}) - {{ airdate }}</h1>
      <div><p>{{summary}}</p></div>
      <div>
        <img :src="imageLink"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Pilot",
  data() {
    // data modelimiz api servisinden dönen tipe göre düzenlendi
    return {
      query: "",
      error: false,
      id: null,
      name: "",
      airdate:"",
      season: null,
      number: null,
      summary: "",
      imageLink: ""
    };
  },
  methods: {
    findEpisode() {
      // api servisine talep gönderen metod
      this.$http
        .get(`/episode/${this.query}`) // sorguyu tamamlıyoruz. parametre olarak input kontrolüne girilen değer alınıyor. query değişkeni üzerinden.
        .then(response => {
          this.error = false;
          this.name = response.data.name; // servisten gelen cevabın içindeki alanların, vue data modelindeki karşılıklarına ataması yapılıyor
          this.season = response.data.season;
          this.number = response.data.number;
          this.summary = response.data.summary; 
          this.airdate=response.data.airDate;
          this.imageLink=response.data.imageLink;
          console.log(response.data); //control amaçlı
        })
        .catch(() => {
          // hata alınması durumu
          this.error = true;
          this.name = "";
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding:10px;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
