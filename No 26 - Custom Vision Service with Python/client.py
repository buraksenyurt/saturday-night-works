# -*- coding: utf-8 -*-

# Bu kod ile test klasöründe yer alan imajları custom vision api servisine sorgulatıyoruz

import requests  # HTTP Post talebini gönderirken kullanacağımız modül
import os  # Klasördeki dosyaları okumak için kullandığımız modül
import filetype  # Dosya tipi kontrolü için ekledik.

# tahminleme servisine ait endpoint
prediction_url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/334ee5e4-4fc8-4a5f-a209-a145ef857dcb/image"
# Servisi kullanabilmek için gerekli API Key
prediction_key = "bf7571576405446782543f832b038891"
# HTTP Post header bilgilerimiz
headers = {"Prediction-Key": prediction_key,
           "content-type": "application/octet-stream"}

files = os.listdir('./Images/test')  # test klasöründeki dosyaları alıyoruz
for f in files:
    filepath = os.path.join('./Images/test', f)
    extension = filetype.guess(filepath).extension # dosya tipini kontrol etmek için bakıyoruz
    if extension == 'jpg': # sadece jpg tipinden dosyalarla çalışıyoruz
        # sıradaki dosyayı binary olarak okuyoruz
        fileData = open(filepath, 'rb').read()
        # Post talebini gönderiyor ve cevabı response değişkenine atıyoruz
        result = requests.post(url=prediction_url,
                               data=fileData, headers=headers)
        print(f)
        for i in range(0, 2):  # taglerimize göre tahminleme bilgilerini okuyoruz
            print(result.json()['predictions'][i]['tagName'])
            print(result.json()['predictions'][i]['probability'])
