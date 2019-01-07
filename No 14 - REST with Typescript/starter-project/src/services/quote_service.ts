import { Quote } from "../models/quote"; // modeli import ettik

// Quote nesnelerinden oluşan diziyi barındıracak bir sözleşme tanımlıyoruz
interface ILibrary {
    quotes: Quote[];
}

// Servis sınıfımız temel CRUD operasyonlarını içermekte
export class QuoteService {
    createQuote(quote: Quote) {
        
    }

    updateQuote(quote: Quote) {

    }

    deleteQuote(quote: Quote) {

    }

    getQuoteById(id: number) {

    }

    getAllQuotes() {

    }
}