import {Guard,HttpResult, MIME_TYPE, HTTP_STATUS_CODE} from "fortjs";
import {Quote} from "../models/quote";

// Guard türevli kendi dekoratör sınıfımız
// Görevi Quote verilerinin içeriklerini kontrol etmek
export class DataValidatorGuard extends Guard{
    // check, Guard sınıfından gelen ve ezilmek zorunda olan metodumuz. Kontrol işlemini üstlenecek
    async check(){
        const quote:Quote=new Quote(this.body);

        // Test amaçlı olarak null dönüyoruz ancak burada veri kontrolü yapılabilir.
        // Örneğin gelen verinin formatı uygun mu?
        // Uygunsa veri içeriğine ait özlü söz kütüphanemizde var mı?
        // Ya da sadece id'nin repository'de olup olmaması gibi basit bir kontrol konulabilir
        // Guard nesneleri attribute şeklinde kullanıldıklarından çeşitlendirilebilirler

        return null;
        // Eğer bir veri ihlali varsa aşağıdaki gibi BadRequest mesajı döndürebiliriz

        /*
        return {
            contentType: MIME_TYPE.Text,
            statusCode: HTTP_STATUS_CODE.BadRequest,
            responseData: "Veri doğrulamada sorun"
        } as HttpResult;
        */
    }
}