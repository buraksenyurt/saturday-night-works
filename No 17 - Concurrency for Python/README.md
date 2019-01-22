# Python tarafında Concurrency Konusunu Anlamak

Amacım Python dilinde özellikle I/O bound ve CPU bound türünden işlemlerde Concurrency, paralel çalışma gibi konuları anlamak. Nitekim çok yukardan bakıldığında aynı anlamda kullanılan Thread, task ve process gibi terimler biraz daha detaylı incelendiğinde tamamen farklılar. Bu detayları görebilmek için bilgisayarları en çok yoran dosya giriş çıkış ve CPU yoğun işlemlere ait örnekleri kod parçaları aracılığıyla incelemek istiyorum.

>I/O Bound işlemler: programın sıklıkla harici kaynaklara gitip geldiği durumlardır. Dosya sistemi ve network hareketlilikleri örnek gösterilebilir. Bu hareketliliklerin program içinde ve dışına doğru fazla olması uygulamanın yavaşlamasına neden olur.

>CPU Bound işlemler: Genellikle CPU'yu yoracak kadar yoğun işlemler için kullanılan terimdir. Bu tip işlemler de uygulamanın hızını doğrudan etkiler. 

Concurrency tipleri aşağıdaki gibi özetlenebilir.

| Concurrency tipi                     | Processor Sayısı               | Açıklaması                                                                                       |
|--------------------------------------|--------------------------------|--------------------------------------------------------------------------------------------------|
| pre-emtive multitasking  (threading) | 1 işlemci                      | Görevlerin Python tarafına ne zaman gönderileceğine işletim sistemi karar verir.                 |
| Cooperative multitasking  (asyncio)  | 1 işlemci                      | Üzerinde çalıştığı işi ne zaman bırakacağına task'lar karar verir.                               |
| Multiprocessing  (multiprocessing)   | N sayıda işlemci veya çekirdek | Tüm işlemler aynı anda ve farklı processlerce icra edilir (Tam anlamıyla Paralellik diyebiliriz) |

## Ön Gereklilikler

Pek tabii ortamda python'un uygun sürümünün yüklü olması gerekiyor. Kodları çalıştırmak için 

```
python sample_1.py
```

şeklinde ilerlenebilir.

## Örnekler

### sample_1.py _(Senkron versiyon)_

I/O Bound operasyonlara bakılan ve senkron çalıştırılan örnektir. Örnek bir kaç web adresi için 300er elemanlık bir array'da dolaşılır ve her biri için HTTP Get talebi yapılarak dönen cevabın boytu yazdırılır. Toplam çalışma süresi hesaplanır. Bu örnekte HTTP talepleri ve session açmak için requests modülüne ihtiyaç vardır. pip ile yükleyebiliriz.

>Bu örneğin kodlaması kolaydır ama senkron çalışma mantığında olduğu için performansı kötüdür.

```
pip install requests
```

### sample_2.py _(threading kullanılan versiyon)_



## Neler Öğrendim?