import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // az biraz bootstrap ile görselliği düzeltelim
import * as alasql from 'alasql'; // alasql ile konuşmamızı sağlayacak modül bildirimimiz

class App extends Component {

  /* yapıcı metod gibi düşünebiliriz sanırım
  genellikle local state değişkenlerini başlatmak ve onlara değer atamak
  için kullanılır
  */
  constructor(props) {
    super(props);

    /* 
    state'i değişebilir veriler için kullanırız. state değişikliği
    bileşenin otomatik olarak yeniden render edilmesi söz konusu olur
    */
    this.state = { skippers: [] };
  }

  /*
  componentWillMount metodu, ilgili bileşen Document Object Model'e bağlanmadan
  önce çalışır.
  Bizim örneğimizde veritabanını ve tablo kontrolünün yapılması ve
  yoklarsa yaratılmaları için ideal bir yerdir
  */
  componentWillMount() {
    /*
    Klasik SQL ifadeleri ile TacticalWorldDb isimli bir veritabanı olup
    olmadığını kontrol ediyor ve eğer yoksa oluşturup onu kullanacağımızı belirtiyoruz.
    SQL ifadelerini çalıştırmak için alasql metodunu çağırmak yeterli.
    */
    alasql(`
            CREATE LOCALSTORAGE DATABASE IF NOT EXISTS TacticalWorldDb;
            ATTACH LOCALSTORAGE DATABASE TacticalWorldDb;
            USE TacticalWorldDb;            
            `);

    /*  
      Şimdi tablomuzu ele alalım. Submarine isimli tablomuzda
      id, name, displacement ve country alanları yer alıyor. 
      Id alanı için otomatik artan bir primary key'de kullandık.
      Örneği abartmamak adına alan dozajını belli bir seviyede tuttuk.
    */
    alasql(`
            CREATE TABLE IF NOT EXISTS Submarine (
              id INT AUTOINCREMENT PRIMARY KEY,
              name VARCHAR(25) NOT NULL,
              displacement NUMBER NOT NULL,
              country VARCHAR(25) NOT NULL
            );
          `);
  }
  /*
  İlk satırda yer alan alasql komutu ile Submarine tablosundaki verileri displacement değerine
  göre büyükten küçüğe sıralı olacak şekilde çekiyoruz.
  Ardından state içeriğini bu tablo verisiyle ilişkilendiriyoruz.
  */
  getAll() {
    const submarineTable = alasql('SELECT * FROM Submarine ORDER BY displacement DESC');
    this.setState({ skippers: submarineTable });
    // console.log(submarineTable); // Kontrol amaçlı açıp F12 ile geçilecek kısımda Console sekmesinden takip edebiliriz. Bir JSON array olmasını bekliyoruz
  }

  /*
  Bileşen DOM nesnesine bağlandıktan sonra çalışan metodumuzdur.
  Burası örneğin tablo içeriğini çekip state nesnesine almak için
  son derece ideal bir yerdir.
  */
  componentDidMount() {
    this.getAll();
  }

  /*
  Yeni bir satır eklemek için aşağıdaki metodu kullanacağız.
  denizaltının adı, tonajı ve menşeği gibi bilgileri
  this.refs özelliği üzerinden yakalyabiliriz. this.refs DOM
  elemanlarına erişmek için kullanılmakta. Bu şekilde 
  formdaki input kontrollerini yakalayıp value niteliklerini
  okuyarak gerekli veriyi çekebiliriz

  Insert sorgusu için yine alasaql nesnesinden yararlanıyoruz.
  Bu sefer parametre içeriğini tek ? içerisinde yollamaktayız.
  Parametre değerleri aslında bir json nesnesi içinden yollanıyor.
  key olarak kolon adını, value olarak da refs üzerinden gelen bileşene ait value özelliğini veriyoruz.
  Id alanının otomatik arttırmak içinse autoval fonksiyonu devreye girmekte.

  Pek tabii yeni eklenen kayıt nedeniyle bileşeni güncellemek lazım.
  getAll metodu burada devreye girmekte
  */
  addSkipper() {
    const { name, displacement, country } = this.refs;
    if (!name.value) return;
    // console.log(dicplacement.value); // Kontrol amaçlı. Browser'dan F12 ile değerlere bakılabilir
    alasql('INSERT INTO Submarine VALUES ?',
      [{
        id: alasql.autoval('Submarine', 'id', true),
        name: name.value,
        displacement: displacement.value,
        country: country.value
      }]
    );
    this.getAll();
  }

  /*
  Silme operasyonunu yapan metodumuz.
  Parametre olarak gelen id değerine göre bir DELETE ifadesi çağırılı
  ve tüm liste tekrardan çekilir.
  */
  deleteSkipper(id) {
    alasql('DELETE FROM Submarine WHERE id = ?', id);
    this.getAll();
  }

  /* 
    State değişikliği gibi durumlarda bileşen güncellenmiş demektir. 
    Bu durumda render fonkisyonu devreye girer.

    render metodu bir HTML içeriği döndürmektedir.
    form sınıfındaki input kontrollerinin ref niteliklerine dikkat edelim.
    Bunları addSkipper metodunda this.refs ile alıyoruz.

    iki button bileşenimiz var ve her ikisinin onClick metodları ilgili fonksiyonları
    işaret ediyor.

    HTML sayfası iki kısımdan oluşuyor. Yeni bir veri girişi yaptığımız form ve tablo verisini
    gösteren bölüm. Tablo içeriğini birer satır olarak ekrana basmak için map fonksiyonundan
    yararlanıyoruz. map fonksiyonu lambda görünümlü blok içerisine sırası gelen satır bilgisini
    atıyor. Örnekte ship isimli değişken bu taşıyıcı rolünü üstlenmekte. ship değişkeni üzerinden
    tablo kolon adlarını kullanarak asıl verilere ulaşıyoruz.
  */
  render() {

    const { skippers } = this.state;

    return (
      <main className="container">
        <h2 className="mt-4">En Büyük Denizlatılar</h2>
        <div className="row mt-4">
          <form>
            <div className="form-group mx-sm-3 mb-2">
              <input type="text" ref="name" className="form-control" id="inputName" placeholder="Sınıfı" />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input type="text" ref="displacement" className="form-control" id="inputDisplacement" placeholder="Tonajı" />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input type="text" ref="country" className="form-control" id="inputCountry" placeholder="Sahibi..." />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <button type="button" className="bnt btn-primary mb-2" onClick={e => this.addSkipper()}>Ekle</button>
            </div>
          </form>
        </div>

        <div>
          <table className="table table-primary table-striped">
            <thead>
              <tr>
                <th scope="col">Sınıfı</th>
                <th scope="col">Tonajı</th>
                <th scope="col">Ülkesi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                skippers.length === 0 && <tr>
                  <td colSpan="5">Henüz veri yok</td>
                </tr>
              }
              {
                skippers.length > 0 && skippers.map(ship => (
                  <tr>
                    <td>{ship.name}</td>
                    <td>{ship.displacement}</td>
                    <td>{ship.country}</td>
                    <td>
                      <button className="btn btn-danger" onClick={e => this.deleteSkipper(ship.id)}>Sil</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </main >
    );
  }
}

export default App;
