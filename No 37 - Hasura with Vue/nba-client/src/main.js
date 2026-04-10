import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApolloProvider } from '@vue/apollo-option';

// Hasura GraphQL Api adresimiz
const hasuraLink = createHttpLink({ uri: 'https://basketin-cepte.herokuapp.com/v1alpha1/graphql' });

/* 
  Servis iletişimini sağlayan nesne
  GraphQL istemcileri veriyi genellikle cache'de tutar.
  Tarayıcı ilk olarak cache'ten okuma yapar. 
  Performans ve network trafiğini azaltmış oluruz bu şekilde.
*/
const apolloClient = new ApolloClient({
  link: hasuraLink, // Kullanacağı servis adresini veriyoruz
  connectToDevTools: true, // Chrome'da dev tools üzerinde Apollo tab'ının çıkmasını sağlar. Debug işlerimiz kolaylaşır
  cache: new InMemoryCache() // ApolloClient'ın varsayılan Cache uyarlaması için InMemoryCache kullanılıyor. 
});

// Vue ortamının GraphQL ile entegre edebilmek için vue-apollo@4 kütüphanesini entegre ediyoruz.
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});

createApp(App)
  .use(apolloProvider)
  .mount('#app');
