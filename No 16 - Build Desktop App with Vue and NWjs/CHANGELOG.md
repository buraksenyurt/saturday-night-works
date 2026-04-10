# Güncellemeler

## 10 Nisan 2026 (Güvenlik Açığı — Dependabot #34, Vue 2 -> 3 + Vite Migrasyonu)

- **Problem:** `vue-template-compiler@2.5.21` paketi istemci taraflı XSS açığına (GHSA-g3ch-rx76-35fx) sahipti. Bu paket Vue 2'ye özgüdür ve Vue 3 ile tamamen kaldırılmıştır.
- **Çözüm:** Uygulama Vue 2'den Vue 3'e taşındı. `@vue/cli-service` yerine Vue ekibinin resmi müktesep önerisi olan **Vite** kullanıldı; `vue-template-compiler` kaldırılıp `@vue/compiler-sfc` (Vite içerisinde gelen) ile değiştirildi.
- **Yapay Zeka Asistanı:** Claude Sonnet 4.6

> **Not:** `nw@0.35.5-sdk` ve `nwjs-builder-phoenix@1.15.0` paketleri Dependabot #34 kapsamı dışında ayrı açıklara sahiptir; bu paketlerin güncellenmesi NW.js masauüstü entegrasyonunu etkileyeceğinden ayrı bir karar gerektirir.

### Paket Değişiklikleri

| **Paket** | **Eski** | **Yeni** | **Açıklama** |
| --- | --- | --- | --- |
| `vue` | `^2.5.21` | `^3.5.0` | Vue 3 |
| `vue-template-compiler` | `^2.5.21` | **kaldırıldı** | XSS açığının kaynağı; Vue 3 ile gerekli değil |
| `@vue/cli-service` | `^3.3.0` | **kaldırıldı** | Vite ile değiştirildi |
| `@vue/cli-plugin-babel` | `^3.3.0` | **kaldırıldı** | Vite kendi transpiler'na (esbuild) sahip |
| `@vue/cli-plugin-eslint` | `^3.3.0` | **kaldırıldı** | Vite ile gereksiz |
| `babel-eslint` | `^10.0.1` | **kaldırıldı** | Kullanımdışan kalktı |
| `eslint`, `eslint-plugin-vue` | `^5.x` | **kaldırıldı** | Vite ile gereksiz |
| `vite` | — | `^6.0.0` | Yeni build aracı |
| `@vitejs/plugin-vue` | — | `^5.2.3` | Vue 3 SFC desteği |

### Kod Değişiklikleri

**`src/main.js`**

- `new Vue({ render: h => h(App) }).$mount('#app')` -> `createApp(App).mount('#app')` (Vue 3 bootstrap API)
- `Vue.prototype.$http = axios` -> `app.config.globalProperties.$http = axios` (Vue 3 global properties API)

**`vite.config.js`** *(yeni)*

- `@vitejs/plugin-vue` ile Vue SFC desteği; `server.port: 8080` ile NW.js `"main": "http://localhost:8080"` yapılandırması korundu

**`index.html`** *(proje köküne taşındı)*

- Vite için `public/` yerine kök dizine taşındı; `<%= BASE_URL %>` sözdizimi `/` ile değiştirildi; `<script type="module" src="/src/main.js">` eklendi

### Çalışma Zamanı

```bash
npm install
npm run serve    # Web önizlemesi
npm run desktop  # NW.js masauüstü modu (npm run serve çalıştırıldıktan sonra)
```

- [x] Windows 11 testleri
- [ ] Ubuntu testleri
