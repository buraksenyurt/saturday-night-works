import { Controller, DefaultWorker, jsonResult, HTTP_STATUS_CODE } from 'fortjs'

export class QuoteController extends Controller {

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
}