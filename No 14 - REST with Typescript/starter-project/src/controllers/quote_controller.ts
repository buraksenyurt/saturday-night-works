import { Controller, DefaultWorker, jsonResult, HTTP_STATUS_CODE, HTTP_METHOD, Worker, Route, Guards } from 'fortjs'
import { QuoteService } from '../services/quote_service';
import { DataValidatorGuard } from '../guards/dataValidatorGuard';

export class QuoteController extends Controller {

    service = new QuoteService(); // CRUD operasyonlarını üstlenen servis nesnemizi örnekledik

    /*
    @DefaultWorker()
    async default() {
        var result = {
            "quotes":
                [
                    { "quote": { "id": 1, "text": "Kontrolsüz güç güç değildir" } },
                    { "quote": { "id": 2, "text": "Ali veli 49 50" } },
                    { "quote": { "id": 3, "text": "Ak akçe karagün içindir" } },
                ]
        };
        return jsonResult(result, HTTP_STATUS_CODE.Ok);
    }
    */
    // HTTP Post'a hizmet edecen Worker metodumuz
    @Worker([HTTP_METHOD.Post])
    @Route("/") // adres bildirimi. Yani http://localhost:4000/quote 
    @Guards([DataValidatorGuard]) // body ile gelen verinin kontrolünü devrettiğimiz Guard nesne bildirimi
    async createQuote() {
        // body'den gelen alanlara bakılarak payload elde edildi
        const payload = {
            id: this.body.id,
            text: this.body.text,
            available: this.body.available,
            owner: this.body.owner
        }
        // servisimizin ilgili metodunu çağırarak quote nesnesini diziye eklettik
        const newQuote = this.service.createQuote(payload);
        // geriye oluşturulan quote içeriğini(id'de barındırır) ve HTTP 201 kodunu gönderdik
        return jsonResult(newQuote, HTTP_STATUS_CODE.Created);
    }

    // Silme operasyonumuz HTTP Delete metoduna cevap verecek
    @Worker([HTTP_METHOD.Delete])
    @Route("/{id}") // QueryString parametresi olarak gelen id değeri
    async deleteQuote() {
        const id = Number(this.param.id);
        const q = this.service.getQuoteById(id);
        if (q != null) {
            this.service.deleteQuote(id);
            return jsonResult("Silindi", HTTP_STATUS_CODE.Ok);
        }
        else {
            return jsonResult("Bulunamadığı için silinemedi", HTTP_STATUS_CODE.NotFound);
        }
    }

    // Bir özlü sözü güncellemek için kullanılır
    // HTTP Put taleplerine karşılık verir
    @Worker([HTTP_METHOD.Put])
    @Route("/") // yönlendirme adresi yine http://localhost:4000/quote şeklinde
    async updateQuote() {
        console.log(this.body);
        const payload = {
            id: this.body.id,
            text: this.body.text,
            available: this.body.available,
            owner: this.body.owner
        }
        const updatedValue = this.service.updateQuote(payload); // güncellemeyi yap
        return updatedValue;
    }

    // varsayılan worker'ımız HTTP Get talepleri sonrası çalışır
    @DefaultWorker()
    async getQuoteList() {
        return jsonResult(this.service.getAllQuotes()); // Sonuçları json formatında gönderdik
    }

    // HTTP Get ve querystring'teki id değerine göre quote döner
    @Worker([HTTP_METHOD.Get])
    @Route("/{id}")
    async getQuoteById() {
        const id = Number(this.param.id); // querystring id değerini al
        const q = this.service.getQuoteById(id); // servis metodunu çağır
        if (q == null) {
            return jsonResult("Bulamadım :(", HTTP_STATUS_CODE.NotFound);
        }
        return jsonResult(q, HTTP_STATUS_CODE.Ok);
    }

    //TODO: Belli bir yazara göre özlü sözleri listeleyen metod denenebilir

}