# Login için Bootstrap Modal Popup kullanmak

Bu örnekte bir Login penceresini modal popup olarak açtırmayı hedefledim. Node.js tabanlı bir sunucu kullanmayı tercih ettim. Modal penceresini bootstrap ile tasarlamaya çalıştım. Login işlemini üstlenen fonksiyonu bir servis noktası olarak sundum ve önyüz kodlamasında jQuery'den yararlandım.

# Başlangıç

```
npm init
npm install --save-dev express morgan body-parser
bower install jquery bootstrap
```

> Offline'da deneyebileyim diye jquery ve bootstrap için gerekli minimum dağıtım paketlerini public klasörü altına attım.