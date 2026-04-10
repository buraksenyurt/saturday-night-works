# Güncellemeler

## 10 Nisan 2026 (Güvenlik Açıkları - apollo-server v2 -> v5)

- **Problem:** `apollo-server@2` paketinde zincirleme açıklar mevcuttu:
  - **GHSA-mp6q-xf9x-fwf7** — `startStandaloneServer` aracılığıyla DoS (apollo-server-core)
  - **GHSA-9q82-xgwf-vj6h** — XS-Search (hALfonly CSRF) aracılığıyla veri okuma (tüm apollo-server sürümleri)
  - **GHSA-wm7h-9275-46v2** — `busboy`/`dicer` aracılığıyla HeaderParser çökmesi
  - **GHSA-c2qf-rxjj-qqgw** — `pg@7`'nin bağlaştığı eski `semver` aracılığıyla ReDoS
- **Çözüm:** Tüm açıklar `@apollo/server@5` (standalone API) ve `pg@8`'e yükseltilerek kapatıldı. `npm audit` -> **0 zafiyet**.
- **Yapay Zeka Asistanı:** Claude Sonnet 4.6

### Paket Değişiklikleri

| **Paket** | **Eski** | **Yeni** | **Açıklama** |
| --- | --- | --- | --- |
| `apollo-server` | `^2.4.8` | **kaldırıldı** | Deprecated — `@apollo/server` ile değiştirildi |
| `@apollo/server` | — | `^5.5.0` | Tüm apollo-server açıklarını kapattı |
| `graphql` | `^14.2.1` | `^16.10.0` | `@apollo/server@5` gereksinimine uygun |
| `graphql-tag` | — | `^2.12.6` | `gql` şablon etiketini sağlar (`apollo-server@2`'de dahildi) |
| `pg` | `^7.9.0` | `^8.13.0` | `semver` ReDoS açığını kapattı |

### Kod Değişiklikleri

**`server.js` ve `pg-server.js`**

- `require('apollo-server')` -> `require('@apollo/server')` + `require('@apollo/server/standalone')`
- `const { gql } = require('graphql-tag')` eklendi (Apollo Server v5'te ayrı paket)
- `new ApolloServer(...).listen(...)` -> `startStandaloneServer(server, { listen: { port } }).then(...)` (v4/v5 standalone API)

### Çalışma Zamanı

```bash
cd src/project-server
npm install
node server.js      # Bellek içi (dummy) sunucu — port 4444
node pg-server.js   # PostgreSQL sunucu — port 4445
```

- [x] Windows 11 testleri
- [ ] Ubuntu testleri
