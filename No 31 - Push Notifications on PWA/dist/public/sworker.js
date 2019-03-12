/*
main.js içerisinde Service Worker olarak bildirimi yapılan dosyamız.
İki olay metodu içerir.
Uygulama herhangibir bildirim aldığında push metodu tetiklenir. 
Bildirim almasını sağlamak için yazdığımız PusherAPI servisine talep göndermemiz yeterlidir. http://localhost:8080/news/push gibi.
Bu metod içerisinde showNotification ile bir bildirim penceresi gösterilir.
Pencereye tıklandığındaysa notificationclick isimli olay tetiklenir.
Bu olayın ele alındığı fonksiyonda ise temsilen bir web sayfası içeriği açtırılır.
*/

self.addEventListener('push', function (event) {
    console.log('push olayı tetiklendi');
    var title = 'Euroleague Haberleri';
    var body = {
        'body': 'Güncel skor bilgileri için tıklayın',
        'tag': 'pwa',
        'icon': './images/48x48.png'
    };
    event.waitUntil(
        self.registration.showNotification(title, body)
    );
});

self.addEventListener('notificationclick', function (event) {
    //TODO: Burada statik bir sayfa içeriği gösterilmesi yerine haber bilgisini servisten alacak kodu ekleyebilirsiniz
    console.log('Şimdi bildirime ait sayfa açılacak');
    var url = './efes_barca.html';
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});