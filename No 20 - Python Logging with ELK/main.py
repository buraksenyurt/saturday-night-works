# Python tarafında logging sistemi built-in olarak gelmektedir.
import logging
import time
import random

logging.basicConfig(filename="appLogs.txt",
                    filemode='a',
                    format='%(asctime)s %(levelname)s-%(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')
logging.warning('Sistem açılışında tutarsızlık')

for i in range(0, 10):  # 10 tane log atıyoruz
    # zamanı 0 ile 4 arası rastgele sürelerde duraksatıp log attırıyoruz
    d = random.randint(0, 4)
    time.sleep(d)
    if d == 3:
        logging.exception('Fatal error oluştu')
    else:
        logging.warning('Sistemde yavaşlık var...')

logging.critical('Sistem kapatılamıyor')
