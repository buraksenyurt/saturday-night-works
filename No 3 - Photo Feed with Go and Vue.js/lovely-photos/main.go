package main

import (
	"database/sql" // sql sorgularını çalıştırmak için
	"io"
	"net/http" // http statu kodları için kullanılacak
	"os"       //io ve os dosya upload işleri için gerekli

	"github.com/labstack/echo" // echo yüksek hızlı bir web framework
	"github.com/labstack/echo/middleware"
	_ "github.com/mattn/go-sqlite3"           //sqlite ile haberleşmek için
	pusher "github.com/pusher/pusher-http-go" //Pusher Channels kullanımı için
)

func main() {
	db := prepareDb() //veritabanı başlatılır
	migrate(db)

	ecto1 := echo.New()

	ecto1.Use(middleware.Logger())  // Loglama için kullanılacak ara katman
	ecto1.Use(middleware.Recover()) // herhangibir yerde Panic oluştuğunda olayı kontrol altına alan ara katman

	// router ayarlamaları
	ecto1.File("/", "public/index.html")       // /  adresine gelen talebe karşın index.html'i render ettirir. Uygulamanın front-end açısından giriş noktasıdır diyebiliriz
	ecto1.GET("/photos", getPhotos(db))        // photos route'una gelen Get talepleri getPhotos metoduna gitsin
	ecto1.POST("/photos", savePhoto(db))       // photos route'una gelen Post talepleri uploadPhoto metoduna gitsin
	ecto1.Static("/uploads", "public/uploads") //uploads klasöründe depolanacak dosyaları kullandırtmak için

	ecto1.Logger.Fatal(ecto1.Start(":7470")) // Uygulama 7470 portu üzerinden yayında olacak
}

// veritabanını hazırlayan fonksiyon
// ambar.sqlite yoksa oluşturulur ve geri döndürülür
func prepareDb() *sql.DB {
	db, err := sql.Open("sqlite3", "db/ambar.sqlite")

	if err != nil || db == nil {
		panic("DB connection error")
	}
	return db
}

// migration fonskiyonu ambar.sqlite veritabanındaki tabloyu hazırlar. yoksa oluşturur.
func migrate(db *sql.DB) {
	query := `create table if not exists 
				photo(
					photoId integer not null primary key autoincrement,
					source varchar not null
				);`
	_, err := db.Exec(query)

	if err != nil {
		panic(err)
	}
}

// kullandığımı tip bilgileri
// fotoğrafı temsilen
type Photo struct {
	PhotoID int64  `json:"photoId"`
	Source  string `json:"source"`
}

// fotoğraları tutan diziyi içeren tipi temsilen
type PhotoList struct {
	Photos []Photo `json:"items"`
}

// Pusher üzerinde bizim için üretilen bilgileri tutan değişken
var pusherClient = pusher.Client{
	AppId:   "661027",
	Key:     "3e8ba0d72e2a6e65a920",
	Secret:  "d12c5aee6f01006bfdc9",
	Cluster: "eu",
	Secure:  true,
}

/*
*** router fonksiyonları ***
 */

/*
yüklenen dosyayı uploads klasörüne kaydeder
yüklenen dosya sonrasında veritabanına da yazılır
kaydedilen fotoğrafa ait üretilen id ve path
JSON Formatında geriye döndürülür
*/
func savePhoto(db *sql.DB) echo.HandlerFunc {
	return func(context echo.Context) error {

		// upload işlemi
		file, err := context.FormFile("file")
		if err != nil {
			return err // hata oluştuysa döndür
		}

		// dosyayı source'a aç
		source, err := file.Open()
		if err != nil {
			return err
		}
		defer source.Close()

		// fiziki dosyayı tanımlı ve disk üzerinde oluştur
		path := "./public/uploads/" + file.Filename
		target := "http://localhost:7470/uploads/" + file.Filename
		destination, err := os.Create(path)
		if err != nil {
			panic(err)
		}
		defer destination.Close()
		if _, err = io.Copy(destination, source); err != nil {
			panic(err)
		}

		//veritabanı sorgusunu hazırla ve fotoğraf lokasyonunu kaydet
		query, err := db.Prepare("insert into photo (source) values(?)")
		if err != nil {
			panic(err)
		}
		defer query.Close()
		result, err := query.Exec(target)
		if err != nil {
			panic(err)
		}

		// db'de bu kayıt için üretilen identity değerini al
		photoID, err := result.LastInsertId()
		if err != nil {
			panic(err)
		}
		// içeriği JSON formatında döndür
		photo := Photo{
			PhotoID: photoID,
			Source:  target,
		}
		pusherClient.Trigger("lovely-photos", "nice-shot", photo)
		return context.JSON(http.StatusOK, photo)
	}
}

/*
Tüm fotoğrafları geriye döndürür
*/
func getPhotos(db *sql.DB) echo.HandlerFunc {
	return func(context echo.Context) error {
		// sorguyu çalıştır
		photos, err := db.Query("Select * from photo order by PhotoID desc")
		if err != nil {
			panic(err)
		}
		defer photos.Close()
		result := PhotoList{}

		// tüm satırları dolaş
		for photos.Next() {
			photo := Photo{}
			err := photos.Scan(&photo.PhotoID, &photo.Source)
			if err != nil {
				panic(err)
			}
			// PhotoList koleksiyonuna o anki photo değişkenini ekle
			result.Photos = append(result.Photos, photo)
		}
		//sonuçları JSON formatında geriye döndür
		return context.JSON(http.StatusOK, result)
	}
}
