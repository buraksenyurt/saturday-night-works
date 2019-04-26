from flask import Flask # basit web özelliklerini kazandırmak için
from random import seed
from random import randint  # Rastgele sayı üretmek için

app = Flask(__name__)

# bir kahraman listemiz var
heros = ["thor", "wolverine", "iron man", "hulk", "doctor strane"
         "kira", "superman", "batman", "wonder woman"]

# kök adrese talep geldiğinde devreye giren metodumuz
@app.route("/")
def getRandomHero():
    randomIndex = randint(0, len(heros)-1) #0 ile listedeki eleman sayısı aralığında rastgele bir tam sayı üretiyoruz
    return '<h2>'+heros[randomIndex]+'</h2>' # sonucu html olarak dönüyoruz
