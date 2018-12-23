<template>
  <div id="firstApp">
      <h1>Yapmam gerekenler</h1>
    <ol>
      <!-- missions data() metodundan dönen dizimiz. Her bir elemanını v-for ile geziyoruz ve value değerlerini listItem olarak ekrana bastırıyoruz -->
      <li v-for='mission in missions'>{{ mission.value }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() { //vue özellikleri data nesnesi içerisinde yer alır.
    return {
      missions: [
        { value: "Vue.js öğrenmeliyim" },
        { value: "Basketbol antrenmanı yapmalıyım" },
        { value: "Kilo vermeliyim" }
      ]
    };
  }
};
</script>

<style>
#firstApp {
  font-size: 24px;
  color: brown;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>

