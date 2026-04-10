# Güncellemeler

## 10 Nisan 2026 (Güvenlik Açıkları - Vue 2 -> 3 + Apollo Client v3 + Vite Migrasyonu)

- **Problem:** `vue-template-compiler@2.5.21` paketi istemci taraflı XSS açığına (GHSA-g3ch-rx76-35fx) sahipti. Ek olarak Apollo Client v2/v1 paketleri (`apollo-client`, `apollo-cache-inmemory`, `apollo-link-*`, `vue-apollo@beta`) bakrımsız olup bilinen güvenlik açıklarına zemin hazırlıyordu.
- **Çözüm:** Uygulama Vue 2'den Vue 3'e taşındı. Build aracı `@vue/cli-service`'den (kendisi de iç bağımlılıkları yoluyla açık barındırıyordu) **Vite**'a geçirildi. Apollo istemcisi `@apollo/client@3` + `@vue/apollo-option@4` ile güncellendi. `npm audit` -> **0 zafiyet**.
- **Yapay Zeka Asistanı:** Claude Sonnet 4.6

### Paket Değişiklikleri

| **Paket** | **Eski** | **Yeni** | **Açıklama** |
| --- | --- | --- | --- |
| `vue` | `^2.6.6` | `^3.5.0` | Vue 3 |
| `vue-template-compiler` | `^2.5.21` | **kaldırıldı** | XSS açığının kaynağı |
| `apollo-client` | `^2.5.1` | **kaldırıldı** | `@apollo/client` ile değiştirildi |
| `apollo-cache-inmemory` | `^1.5.1` | **kaldırıldı** | `@apollo/client` içinde |
| `apollo-link-http` | `^1.5.14` | **kaldırıldı** | `@apollo/client/core`'da `createHttpLink` olarak |
| `apollo-link-context` | `^1.0.17` | **kaldırıldı** | Kullanılmıyordu |
| `vue-apollo` | `^3.0.0-beta.28` | **kaldırıldı** | `@vue/apollo-option` ile değiştirildi |
| `bootstrap-vue` | `^2.0.0-rc.16` | **kaldırıldı** | Vue 3 uyumsuz; yalın Bootstrap CSS yeterli |
| `core-js` | `^2.6.5` | **kaldırıldı** | Vite/esbuild ile gerekli değil |
| `@apollo/client` | — | `^3.13.0` | Apollo Client v3 (core export ile Vue uyumu) |
| `@vue/apollo-option` | — | `^4.0.0` | Vue 3 Options API Apollo entegrasyonu |
| `graphql` | `^14.2.1` | `^16.10.0` | Apollo Client v3 gereksinimi |
| `graphql-tag` | `^2.10.1` | `^2.12.6` | Bileşenler için `gql` |
| `@vue/cli-service` | `^3.5.0` | **kaldırıldı** | Vite ile değiştirildi |
| `@vue/cli-plugin-*` | v3 | **kaldırıldı** | Vite ile gereksiz |
| `babel-eslint` | `^10.0.1` | **kaldırıldı** | Kullanımdışan kalktı |
| `vite` | — | `^6.0.0` | Yeni build aracı |
| `@vitejs/plugin-vue` | — | `^5.2.3` | Vue 3 SFC desteği |

### Kod Değişiklikleri

**`src/main.js`**

- `new Vue({ apolloProvider, render }).$mount('#app')` -> `createApp(App).use(apolloProvider).mount('#app')`
- `import { ApolloClient } from 'apollo-client'` + ayrı link/cache paketleri -> `import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'`
- `import VueApollo from 'vue-apollo'` + `Vue.use(VueApollo)` -> `import { createApolloProvider } from '@vue/apollo-option'` + `.use(apolloProvider)`

**`src/components/ProductList.vue`**

- `import ProductItem from './ProductItem'` -> `import ProductItem from './ProductItem.vue'` (Vite zorunlu uzantı isteği)

**`vite.config.js`** *(yeni)*

- `@vitejs/plugin-vue` ile Vue 3 SFC desteği

**`index.html`** *(proje köküne taşındı)*

- `<%= BASE_URL %>` -> `/`; `<script type="module" src="/src/main.js">` eklendi

### Çalışma Zamanı

```bash
cd nba-client
npm install
npm run serve   # http://localhost:5173 (Hasura GraphQL API gerektirir)
npm run build
```

- [x] Windows 11 testleri
- [ ] Ubuntu testleri
