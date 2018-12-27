from flask import Flask
# Ozellikle POST metodunda gonderilen body icerigini almak icin isimize yarayacak
from flask import request
import jsonschema
from jsonschema import validate  # JSON schema kontrolu icin kullanabiliriz
from flask import jsonify  # JSONlastirma destegi icin
app = Flask(__name__)

# baslangic icin ornek kategori listemiz
categories = [
    {'id': 1, 'name': 'Kitap', 'count': 15},
    {'id': 2, 'name': 'Robotik Oyuncak', 'count': 5},
    {'id': 3, 'name': 'DVD Film', 'count': 20},
    {'id': 4, 'name': 'Bilgisayar', 'count': 10},
]

# JSON formatindaki bir category nesnesinin schema tanimi
categorySchema = {
    "type": "object",
    "properties": {
        "id": {"type": "number"},
        "name": {"type": "string"},
        "count": {"type": "number"},
    },
}


# categories url path'i icin route tanimi ve fonksiyon
@app.route("/categories/")
def get_all_categories():
    """Tum kategorileri verir"""
    return jsonify(categories)


# route tanimindaki id degerine gore bir kategori dondurulur
@app.route("/categories/<int:id>")
def get_category(id):
    """Id bazli kategoriyi verir"""
    return jsonify([c for c in categories if c['id'] == id])  # basit bir sorgu ile id bazli kategoriyi bulup json'lastirip donduruyoruz.


@app.route("/categories", methods=['POST'])  # HTTP Post talebini tanimladik
def add_category():
    """Yeni bir kategori ekler"""
    content = request.get_json()  # talebin govdesinden gelen JSON icerigini al
    # print(content)
    categories.append(content)  # icerigi listeye ekle
    return jsonify(content)  # eklenen icerigi geri dondur


# category/id seklinde gelen HTTP PUT taleplerini fonksiyona yonlendiriyoruz
@app.route("/categories/<int:id>", methods=['PUT'])
def edit_category(id):
    """ID ile verilen kategoriyi gunceller"""
    body = request.get_json()  # talep govdesindeki json icerigini al
    # category json schema'sina uyuyor mu?
    # id'den category'yi bul
    category = [c for c in categories if c['id'] == id]
    if category:  # category bulunduysa islemleri yap
        # print(category)
        category[0]['name'] = body['name']
        category[0]['count'] = body['count']
        return jsonify(body)
    else:
        return jsonify("{'result':'category not found'}")


# Uygulama calismaya basladiginda localhost 4446 nolu porttan hizmet verecek.
# Debug ozelligi de acik
if __name__ == '__main__':
    app.run(host='localhost', port=4446, debug=True)
