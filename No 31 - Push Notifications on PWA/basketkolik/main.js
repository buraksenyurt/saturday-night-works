// load aşamasında Service Worker için register işlemi yapılır
window.addEventListener('load', e => {
    if (!('serviceWorker' in navigator)) {
        console.log('Service worker desteklenmiyor');
        return;
    }
    navigator.serviceWorker.register('sworker.js')
        .then(function () {
            console.log('Servis Worker kaydoldu');
        })
        .catch(function (err) {
            console.log('Hımm...Sanırım bir hata oluştu : ', err);
        });
});

// Push Notification durumunu günceller
// Aktifse active.png, değilse passive.png
function updateStatus(status) {
    divPush.dataset.checked = status; // statu bilgisini set et
    if (status) { //true ise aktif
        buttonPush.src = "./assets/active.png";
    }
    else { // değilse pasif olan ikonu göster
        buttonPush.src = "./assets/passive.png";
    }
}

function isPushNotifyEnabled() {
    if (Notification.permission === 'denied') {
        alert('Kullanıcı Push Notification hizmetini bloklamış');
        return;
    }

    if (!('PushManager' in window)) {
        alert('Üzgünüm ama Push Notification bu tarayıcı modelinde desteklenmiyor');
        return;
    }

    /*
    Kullanıcı Push Notification'ı engellememiş ve tarayıcı da bunu destekliyorsa
    buraya geliriz.
    Eğer Service Worker hazır ve kaydolmuşsa abonelik yönetimine başlanabilir. 
    */
    navigator.serviceWorker.ready.then(function (reg) {
        reg.pushManager.getSubscription() //abone ol
            .then(function (subs) { // abonelik durumuna göre statüleri güncelle
                if (subs) {
                    updateStatus(true);
                }
                else {
                    updateStatus(false);
                }
            })
            .catch(function (err) { // bir hata oluştuysa tarayıcı console'una hata basıyoruz.
                console.error('Bir hata oluştu : ', err);
            });
    });
}

// Uygulamayı Push Notification hizmetine abone etmek için
function subscribe() {
    navigator.serviceWorker.ready
        .then(function (reg) {
            if (!reg.pushManager) {
                alert('Tarayıcı Push Notification hizmetini desteklemiyor');
                return false;
            }
            reg.pushManager.subscribe(
                { userVisibleOnly: true }
            ).then(function (subs) {
                console.log('Abonelik başladı.');
                console.log(subs);
                sendSubsID(subs); // Abonelik IDsini REST servise gönderen metodu çağırdık
                updateStatus(true);
            }).catch(function (err) {
                updateStatus(false);
                console.error('Abone olma işlemi sırasında hata oluştu: ', err);
            });
        });
}

// Abonelikten çıkartmak için
function unsubscribe() {
    navigator.serviceWorker.ready
        .then(function (reg) {
            reg.pushManager.getSubscription()
                .then(function (subs) {
                    if (!subs) {
                        alert('Abonelikten çıkılamıyor yahu :S');
                        return;
                    }
                    subs.unsubscribe()
                        .then(function () {
                            console.log('Abonelikten çıkıldı');
                            console.log(subs);
                            deleteSubsID(subs); // Aboneliği silerken ID'yi çıkartacak olan REST servis metodunu çağırdık
                            updateStatus(false);
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                })
                .catch(function (err) {
                    console.error('Abonelikten çıkarken bir hata oluştu : ', err);
                });
        })
}

// Sunucuya Subscription ID bilgisini göndermek için kullanıyoruz
// Bunun için yazdığımız PusherAPI node servisini kullanıyoruz
function sendSubsID(subscription) {
    var id = subscription.endpoint.split('gcm/send/')[1];
    fetch('http://localhost:8080/subscribers', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionid: id })
    });
}

//---extract the subscription id and send it
// over to the REST service---
function deleteSubsID(subscription) {
    var id = subscription.endpoint.split('gcm/send/')[1];
    fetch('http://localhost:8080/subscribers/' +
        id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}

// div ve button elementlerini alıyoruz
var divPush = document.getElementById('divPush');
var buttonPush = document.getElementById('buttonPush');

/*
div elementinde mouse ile tıklandığı zaman gerçekleşecek olayı
dinleyecek bir listener bildirimi yaptık
*/
divPush.addEventListener('click', function () {
    //console.log('Click');
    if (divPush.dataset.checked === 'true') {
        //console.log('Unsubscribe');
        unsubscribe();
    }
    else {
        //console.log('Subscribe');
        subscribe();
    }
});

isPushNotifyEnabled();