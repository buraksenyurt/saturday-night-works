# task bazlı concurrency örneği

import aiohttp
import asyncio
import time

# talebi gönder
async def getResponse(address, session):
    async with session.get(address) as response:
        print(f"{address} adresinden {response.content_length} bytes geldi.\n")

#tümü için talepleri işlet
async def getAll(addresses):
    async with aiohttp.ClientSession() as session:  # aiohttp paketinden bir Session nesnesi alınır
        tasks = []  # taskların tutulacağı dizi
        for address in addresses:  # her bir adres için
            # getResponse metodunu o adres ve oluşturulan session ile kullanacak task nesnesini üret
            task = asyncio.ensure_future(getResponse(address, session))
            tasks.append(task)  # tasklara yeni task'ı ekle
        # tüm tasklar tamamlanıncaya kadar session'ı canlı tut
        await asyncio.gather(*tasks, return_exceptions=True)

if __name__ == "__main__":
    print("Web talepleri gönderiliyor")
    # Üstünde çalışacağımız örnek web adresleri

    targetSites = [
        "https://github.com/jdorfman/awesome-json-datasets",
        "https://dev.to/awwsmm/101-bash-commands-and-tips-for-beginners-to-experts-30je",
        "https://www.buraksenyurt.com/post/raspberry-pi-ve-python-calisma-notlarim"
    ] * 300  # 300er adet oluşturur
    beginning = time.time()  # başlamadan önceki zamanı al
    asyncio.get_event_loop().run_until_complete(getAll(targetSites)) # burada bir olay döngüsü başlatılır ve getAll fonksiyonu işini tamamlayınca kadar yaşamını sürdürür
    duration = time.time()-beginning  # toplam süreyi hesapla
    print(f"Toplam çalışma süresi {duration} saniye")
