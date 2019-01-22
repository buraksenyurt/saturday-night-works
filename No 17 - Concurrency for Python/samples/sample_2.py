# Sample_1 deki I/O Bounds işlemini Threading kullanarak icra etmeye çalışıyoruz.

import time
import requests
import concurrent.futures
import threading

# requests.Session thread-safe değildir. Bu sebepten oluşturulan thread'lerin
# tekil bir Session ile ilişkilendirilmesi ve yaşam süresi boyunca bu session nesnesini
# kullanabilmesi için oluşturduğumuz bir değişken var.
specific_thread_object = threading.local()


def getThreadSession():  # güncel thread için session üret veya üretileni geri ver
    # Önce bak bakalım thread_session mevcut mu? Mevcut değilse requests tipinden çek
    # Mevcutsa var olanı geri döndür
    if not getattr(specific_thread_object, "thread_session", None):
        specific_thread_object.thread_session = requests.Session()
    return specific_thread_object.thread_session


threads = []


def getResponse(address):  # talebi gönder
    session = getThreadSession()  # güncel thread'in kullandığı session nesnesini verir
    # o session nesnesi ile HTTP Get talebi yapılır
    with session.get(address) as response:
        if not threading.get_ident() in threads:
            threads.append(threading.get_ident())

        print(threading.get_ident())
        print("{0} adresinden {1} bytes geldi".format(address,len(response.content)))


# Thread Pool yönetimini yapan ve toplu talepleri gönderen metodumuz
# Pool'a alınan Thread'leri yönetebilmek, join, queue gibi alt seviye thread işlemleriyle
# uğraşmamak için daha yüksek seviyede tasarlanmış olan ThreadPoolExecutor
# nesnesinden yararlanıyoruz.
def getAll(addresses, workerCount):
    with concurrent.futures.ThreadPoolExecutor(max_workers=workerCount) as manager:
            # metod parametresindeki array içeriğini getResponse metoduyla
            # oluşturulacak işçi sayısına göre eşleştirir. Örneğin workerCount 8 verilmişse
            # maksimum işçi sayısı 8 olarak hesaplanır.
            # buna göre en fazla 8 adet eş zamanlı çalışacak thread söz konusu olabilir
        manager.map(getResponse, addresses)


if __name__ == "__main__":
    print("Web talepleri gönderiliyor")
    # Üstünde çalışacağımız örnek web adresleri

    targetSites = [
        "https://github.com/jdorfman/awesome-json-datasets",
        "https://dev.to/awwsmm/101-bash-commands-and-tips-for-beginners-to-experts-30je",
        "https://www.buraksenyurt.com/post/raspberry-pi-ve-python-calisma-notlarim"
    ] * 300  # 300er adet oluşturur
    beginning = time.time()  # başlamadan önceki zamanı al
    getAll(targetSites, 16)
    duration = time.time()-beginning  # toplam süreyi hesapla
    print("Toplam çalışma süresi {0} saniye".format(duration))

    print("Oluşan thread'ler {0}".format(threads))
