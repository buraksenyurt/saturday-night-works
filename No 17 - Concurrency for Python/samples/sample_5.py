# CPU Bound işlem örneği
# Concurrency teknikleri olmadan

import math
import time
import random
import multiprocessing


def factorial(n):
    if n == 1:
        return n
    else:
        return n*factorial(n-1)


def getRandoms(size):
    numbers = []
    for x in range(size):
        numbers.append(random.randint(1, 100))
    return numbers


def computeSync(numbers):
    for n in numbers:
        factorial(n)

processorCount=multiprocessing.cpu_count()

def computeMultiprocessing(numbers):
    # dizideki her bir sayı için factorial fonksiyonuna map'leme yapılıyor
    with multiprocessing.Pool(processes=processorCount) as pool: #process sayısını vermek zorunda değiliz. Varsayılan olarak makinedeki CPU sayısı kadardır.
        pool.map(factorial, numbers)


if __name__ == "__main__":
    print("Programın çalıştığı bilgisayarda {0} CPU var".format(processorCount))
    numbers = getRandoms(3000000)

    beginning = time.time()  # başlamadan önceki zamanı al
    # parametre olarak gelen rastgele sayı kümesi için hesaplama yaptırıyoruz.
    computeSync(numbers)
    duration = time.time()-beginning  # toplam süreyi hesapla
    print("Toplam çalışma süresi {0} saniye".format(duration))

    beginning = time.time()  # başlamadan önceki zamanı al
    # parametre olarak gelen rastgele sayı kümesi için hesaplama yaptırıyoruz.
    computeMultiprocessing(numbers)
    duration = time.time()-beginning  # toplam süreyi hesapla
    print("Toplam çalışma süresi {0} saniye".format(duration))
