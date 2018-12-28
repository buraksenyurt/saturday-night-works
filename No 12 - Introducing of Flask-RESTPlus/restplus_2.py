# Bu sefer namespace kullanimi ve basit Data Access Object uyarlamasi soz konusu
from flask import Flask
from flask_restplus import Api, Resource, fields
# CategoryDAO dosyasindan CategoryDAO sinifini import ettik
from CategoryDAO import CategoryDAO

app = Flask(__name__)
api = Api(app, version="1.1", title="Kategorilerimiz",
          description="Bakkaldaki urun kategorileri icin gelistirilmis RESTful servistir")

# Namespace tanimlamasi
# @api'leri @ns ile degistirmek ve categories kisimlarini cikartmak yeterli
ns = api.namespace('categories', 'Bakkal Kategorileri')

categoryType = api.model('category', {
    'id': fields.Integer(required=True, description='id degeri'),
    'name': fields.String(required=True, description='kategori adi'),
    'count': fields.Integer(required=True, description='stokta ne kadar var'),
})

# Basit Data Access Object nesnemizi ornekliyoruz
ctgMngr = CategoryDAO()


@ns.route("/")
class Categories(Resource):
    def get(self):
        """Tum kategorilerin listesini verir"""
        return ctgMngr.getAll()

    @ns.doc(responses={201: 'Kategori olusturuldu'})
    @ns.expect(categoryType)
    def post(self):
        """Listeye yeni bir kategori ekler"""
        value = api.payload
        ctgMngr.add(value)
        # Eklenen kategori HTTP 201(Created) kodu ile yollanir
        return value, 201


@ns.route("/<int:id>")
class Category(Resource):
    @ns.doc(responses={404: 'Kategori bulunamadi'}, params={'id': 'Kategori id degeri'})
    def get(self, id):
        """Belli bir kategori bilgisini dondurur"""
        return ctgMngr.getById(id)

    @ns.expect(categoryType)
    def put(self, id):
        """Bir kategorinin bilgilerini gunceller"""
        value = api.payload
        ctgMngr.update(id, value)
        return value

    @ns.doc(responses={204: 'Kategori silindi'})
    def delete(self, id):
        """Kategoriyi listeden siler"""
        ctgMngr.delete(id)
        return '', 204  # bos bir mesaj HTTP 204(No Content) kodu ile yollanir


if __name__ == '__main__':
    app.run(host='localhost', port=4446, debug=True)
