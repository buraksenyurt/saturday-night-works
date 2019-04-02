# Flask modülünü import ediyoruz
from flask import Flask
# sayfa yönlendirme işlemleri için redirect modülünden yararlanmaktayız
from flask import redirect
# otomatik olarak templates klasörünü tarayacak render_template modülünü de ekledik
from flask import render_template
# HTTP Request'lerini kolayca ele almamızı sağlayacak request modülü de gerekli tabii
from flask import request
# Flask ile SQLAlchemy arasındaki iletişimi kolaylaştırmak için aşağıdaki modüle de ihtiyacımız var
from flask_sqlalchemy import SQLAlchemy

# SQLite veri tabanınımıza ait bağlantı bilgisi
dbFile = "sqlite:///Fabrikam.db"

# uygulama nesnesini oluşturuyoruz
app = Flask(__name__)
# Flask çalışma zamanına veri tabanı adresini bildiriyoruz
app.config["SQLALCHEMY_DATABASE_URI"] = dbFile
# veri tabanı nesnesini oluşturuyoruz. Parametre ile uygulama çalışma zamanına enjekte ediyoruz
db = SQLAlchemy(app)


class todo(db.Model):  # SQLAlchemy db nesnesinden türeyen todo isimli bir model sınıfımız var (ORM tarafının entity nesnesi olarak düşünelim)
    # tabloda olmasını beklediğimiz kolonları Entity Field olarak tanımlıyoruz
    # Pimary key belirtmediğimiz durumda db oluşturma script'inde hata aldığımı fark ettim
    title = db.Column(db.String(40), unique=True,
                      nullable=False, primary_key=True)
    description = db.Column(db.String(250))
    level = db.Column(db.String(2))

    # ToString metodunu override ettiğimizi düşünelim
    def __repr__(self):
        return "{0} [{1}] {2}".format(self.title, self.description, self.level)

# localhost:5005 adresine gelen talepleri karşılayan metod. Hem Get hem de Post çağrılarını ele alır
@app.route("/", methods=["GET", "POST"])
def home():
    # Yapılacaklar listesinin tutulduğu değişkenimiz
    todoList = None

    if request.form:
        # HTTP Post talebi olmuşsa, post edilen form verilerini kullanarak todo nesnesini oluşturuyoruz.
        # form içeriklerini form.get metodu ile almaktayız. get metoduna parametre olarak verilen değerler,
        # index.html içerisindeki element adları
        data = todo(title=request.form.get("title"), description=request.form.get(
            "description"), level=request.form.get("level"))
        db.session.add(data)  # nesne içeriğini veri tabanına ekliyor
        db.session.commit()  # ve işlemi commit ediyoruz

    todoList = todo.query.all()
    # index.html sayfasındaki todos içeriğini model üzerinde yapılan select all sorgusu ile dolan todolist ile dolduruyoruz
    # index.html'in templates altında olduğunu söylemediğimize dikkat edelim. 
    # render_template otomatik olarak templates klasörünü taramaktadır.
    return render_template("index.html", todos=todoList)

# Task silme işini üstlenen metod
# Bunu da POST çağrısı ile ele alıyoruz (Aslında DELETE talebi daha uygun olurdu. Araştır Burak)
@app.route("/delete", methods=["POST"])
def delete():
    # önce form içeriğinden currentTitle değerini alıyoruz. 
    # title bilgisini todo tablosunda benzersiz nitelikli belirlediğimizden kullanabiliriz
    title = request.form.get("currentTitle")
    # veri tabanından title bilgisini buluyoruz
    task = todo.query.filter_by(title=title).first()
    # siliyoruz
    db.session.delete(task)
    # ve değişikliği commit ediyoruz
    db.session.commit()
    # son olarak tekrar anasayfaya yönlendirme yapıyoruz
    return redirect("/")


if __name__ == "__main__":
    # localhost:5005 adresinden yayin yapiyoruz
    app.run("localhost", 5005, debug=True)
