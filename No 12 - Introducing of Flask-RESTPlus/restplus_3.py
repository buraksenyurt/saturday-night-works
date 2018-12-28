# Bu sefer Blueprint tasarim modeline uygun bir API yaziyoruz
from flask import Flask, Blueprint  # Bu nedenle blueprint module eklendi
from flask_restplus import Api, Resource, fields
from CategoryDAO import CategoryDAO

# Blueprint uygulayan api degiskeni.
api_v1 = Blueprint('api', __name__)

# api degiskenini olustururken ilk parametre olarak api_v1 kullaniliyor
api = Api(api_v1, version="1.0", title="Kategorilerimiz",
          description="Bakkaldaki urun kategorileri icin gelistirilmis RESTful servistir", doc='/docs')

ns = api.namespace('categories', 'Bakkal Kategorileri')

categoryType = api.model('category', {
    'id': fields.Integer(required=True, description='id degeri'),
    'name': fields.String(required=True, description='kategori adi'),
    'count': fields.Integer(required=True, description='stokta ne kadar var'),
})

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
    app = Flask(__name__)
    app.register_blueprint(api_v1, url_prefix='/api/v1')
    # api_v1 i app nesnesine register ediyoruz
    # Son parametrede url eki belirtiliyor. Buna gore http://localhost:4446/api/v1/docs seklinde Swagger arayuzune ulasilabilir
    app.run(host='localhost', port=4446, debug=True)
