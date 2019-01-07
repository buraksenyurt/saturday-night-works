import { Controller, DefaultWorker, jsonResult, HTTP_STATUS_CODE, HTTP_METHOD, Worker, Route } from 'fortjs'
import { QuoteService } from '../services/quote_service';

export class QuoteController extends Controller {

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
    async createQuote() {
        const service = new QuoteService(); // servisimizi oluşturduk
        // body'den gelen alanlara bakılarak payload elde edildi
        const payload = {
            id:this.body.id,
            text: this.body.text,
            available: this.body.available,
            owner: this.body.owner
        }
        // servisimizin ilgili metodunu çağırarak quote nesnesini diziye eklettik
        const newQuote = service.createQuote(payload);
        // geriye oluşturulan quote içeriğini(id'de barındırır) ve HTTP 201 kodunu gönderdik
        return jsonResult(newQuote, HTTP_STATUS_CODE.Created);
    }

    // varsayılan worker'ımız HTTP Get talepleri sonrası çalışır
    @DefaultWorker()
    async getQuoteList() {
        const service = new QuoteService(); // CRUD operasyonlarını üstlenen servis nesnemizi örnekledik
        return jsonResult(service.getAllQuotes()); // Sonuçları json formatında gönderdik
    }


}