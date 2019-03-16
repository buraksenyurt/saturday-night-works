export const environment = {
  production: false,
  // Firebase'in orada oluşturduğumuz projemiz için bize verdiği ayarlar
  firebaseConfig: {
    apiKey: "AIzaSyCEK58ovOUcB-jwrhFd25v7L8xnK8sbPoI", //Burası sizin projenizin Api Key değeri olmalı
    authDomain: "quict-auctions-project.firebaseapp.com",
    databaseURL: "https://quict-auctions-project.firebaseio.com",
    projectId: "quict-auctions-project",
    storageBucket: "quict-auctions-project.appspot.com",
    messagingSenderId: "251511971515" // Bu da sizin projeniz için verilen senderId değeri olmalı
  },
};