# multiprocessing örneği
# kodlaması diğerlerine göre daha kolaydır
# Session nesnesinin kullanımına ise dikkat edilmelidir
# Process başına nasıl ayarlandığı başka ortak nesne kullanan senaryolar için yol göstericidir

import requests
import time
import multiprocessing

# Pool içindeki her process kendi bellek alanında yaşıyor.
# Yani birbirleriyle bu örnekte olduğu gibi Session nesnesini paylaşamazlar.
# Her process kendi Session nesnesine sahip olmalı
# Bunu global bir değişkenle sağlıyor ve elde edilmesi için getSession metoduna başvuruyoruz
# Nitekim her metod çağrısında bir Session oluşturulmaması gerekir.
# Process'lerin her biri için o process'e ait bir Session nesnesi kullanmalıyız.
processSession = None

def getSession():
    global processSession
    if not processSession:
        processSession = requests.Session()


def getResponse(address):
    with processSession.get(address) as response:
        currentProcessName = multiprocessing.current_process().name
        print(currentProcessName)
        print("{0} adresinden {1} bytes geldi.\n".format(
            address, len(response.content)))


def getAll(addresses):
    # CPU sayısına göre Process havuzu oluşturulur
    # Process'lerin kullanacağı Session nesneleri initializer parametresine göre
    # getSession metodundan tedarik edilir
    # map fonksiyonu ile Process ve metod eşleştirmeleri yapılır
    with multiprocessing.Pool(initializer=getSession) as processPool:
        processPool.map(getResponse, addresses)


if __name__ == "__main__":
    print("Web talepleri gönderiliyor")
    # Üstünde çalışacağımız örnek web adresleri

    targetSites = [
        "https://github.com/jdorfman/awesome-json-datasets",
        "https://dev.to/awwsmm/101-bash-commands-and-tips-for-beginners-to-experts-30je",
        "https://www.buraksenyurt.com/post/raspberry-pi-ve-python-calisma-notlarim"
    ] * 300  # 300er adet oluşturur
    beginning = time.time()  # başlamadan önceki zamanı al
    getAll(targetSites)
    duration = time.time()-beginning  # toplam süreyi hesapla
    print("Toplam çalışma süresi {0} saniye".format(duration))