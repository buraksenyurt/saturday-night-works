# Senkron olarak çalışan I/O Bound örneğidir

import requests  # http talep gönderimleri için kullanılan paketler
import time  # süre ölçümleme için
print("Bir kaç internet adresinden veri çekmeye çalışmak")

if __name__ == "__main__":
    # Üstünde çalışacağımız örnek web adresleri
    targetSites = [
        "https://github.com/jdorfman/awesome-json-datasets",
        "https://dev.to/awwsmm/101-bash-commands-and-tips-for-beginners-to-experts-30je",
        "https://www.buraksenyurt.com/post/raspberry-pi-ve-python-calisma-notlarim"
    ] * 300  # 300er adet oluşturur
    beginning = time.time()  # başlamadan önceki zamanı al

    with requests.Session() as session:  # bir session başlat
        for url in targetSites:  # her bir site için
            # http get talebini gönderip dönen cevabı response nesnesine al
            with session.get(url) as response:
                # boyutu bildir
                print(f"{url} adresinden {len(response.content)} bytes geldi.\n")

    duration = time.time()-beginning  # toplam süreyi hesapla
    print(f"Toplam çalışma süresi {duration} saniye")
