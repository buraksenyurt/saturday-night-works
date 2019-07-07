import { Quote } from "../models/quote"; // modeli import ettik

// Quote nesnelerinden oluşan diziyi barındıracak bir sözleşme tanımlıyoruz
interface ILibrary {
    quotes: Quote[];
}

const library: ILibrary = {
    quotes: []
}

// Servis sınıfımız temel CRUD operasyonlarını içermekte
export class QuoteService {
    // yeni bir quote nesnesi ekler
    createQuote(quote: Quote) {
        library.quotes.push(quote);
        return quote;
    }

    // gelen quote bilgisine bakarak güncelleme yapar
    updateQuote(quote: Quote) {
        // gelen quote nesnesindeki id değerini kullanarak kaydı bul
        const current = library.quotes.find(q => q.id === quote.id);
        if (current != null) { //kayıt varsa alanlarını güncelle
            current.id=quote.id;
            current.text = quote.text;
            current.owner = quote.owner;
            current.available = quote.available;
            return current;
        }
        else
            return quote;
    }

    // id değerine göre silme işlemini yapar
    deleteQuote(id:number) {
        const currentID=library.quotes.findIndex(q=>q.id===id); // id üzerinden kaydın indeksini bul
        library.quotes.splice(currentID,1); // index'in bulunduğu yerden itibaren 1 kayıt sil
    }

    // id değerine göre quote'ı bulur
    getQuoteById(id: number) {
        const current=library.quotes.find(q=>q.id===id);
        return current;
    }

    // tüm özlü sözleri döndürür
    getAllQuotes() {
        return library.quotes;
    }
}