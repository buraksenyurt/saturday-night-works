# Ilk ornekte resource bazli siniflar soz konusudur. Bunun sebebi metod adlarinin HTTP Verb olma zorunlulugudur.
# Metod adlari dikkat edilecegi uzere GET,POST,PUT veya DELETE gibi isimlendirilebilir (Baska isim verip deneyin)
# Ornek document yorum satirlarini baz alir ve bunlari Swagger UI'inda otomatik olarak kullanir

from flask import Flask
from flask_restplus import Api, Resource, fields

app = Flask(__name__)
# api nesnesi tanimlaniyor
# title, description gibi bilgiler Swagger UI tarafinda ele alinacak
# version bilgisi verilmezse 1.0 olarak kabul edilir
api = Api(app, version="1.1", title="Kategorilerimiz",
          description="Bakkaldaki urun kategorileri icin gelistirilmis RESTful servistir")

categories = []

# Category tipinin modelini tanimliyoruz. POST metodunda isimize yarayacak
categoryType = api.model('category', {
    'id': fields.Integer(required=True, description='id degeri'),
    'name': fields.String(required=True, description='kategori adi'),
    'count': fields.Integer(required=True, description='stokta ne kadar var'),
})

# iki resource tipimiz var. Categories ve Category olarak isimlendirildiler
# Her birisi icin ayri birer sinif soz konusu


@api.route("/categories")
class Categories(Resource):
    def get(self):
        """Tum kategorilerin listesini verir"""
        return categories

    @api.doc(responses={201: 'Kategori olusturuldu'})  # Swagger icin ek bilgi
    # Swagger'a category nesne tipini de iletiyoruz. categoryType tanimina bakin.
    @api.expect(categoryType) #Swagger arayuzundeki payload degiskeninin icerigini burada parametre olarak gecilen model belirler
    def post(self):
        """Listeye yeni bir kategori ekler"""
        value = api.payload
        categories.append(value)
        # Eklenen kategori HTTP 201(Created) kodu ile yollanir
        return value, 201


@api.route("/categories/<int:id>")
class Category(Resource):
    # Bulunamazsa 404 donecegini ve id parametresinin ne anlama geldigini Swagger'a bildirdik.
    @api.doc(responses={404: 'Kategori bulunamadi'}, params={'id': 'Kategori id degeri'})
    def get(self, id):
        """Belli bir kategori bilgisini dondurur"""
        return [c for c in categories if c['id'] == id]

    @api.expect(categoryType)
    def put(self, id):
        """Bir kategorinin bilgilerini gunceller"""
        value = api.payload
        category = [c for c in categories if c['id'] == id]
        category[0]['name'] = value['name']
        category[0]['count'] = value['count']
        return value

    @api.doc(responses={204: 'Kategori silindi'})
    def delete(self, id):
        """Kategoriyi listeden siler"""
        category = [c for c in categories if c['id'] == id]
        categories.remove(category[0])
        return '', 204  # bos bir mesaj HTTP 204(No Content) kodu ile yollanir


if __name__ == '__main__':
    app.run(host='localhost', port=4446, debug=True)
