import { Length, IsIn } from "class-validator";
export class Quote {
    id?: number;

    @Length(100)
    text?: string; // en fazla 100 karakter uzunluğunda bir string değişke

    @Length(100)
    owner?: string;

    @IsIn(["yes", "no"]) //seçenekleri evet veya hayır olabilen string bir değişken
    available: string;

    constructor(quote: any) {
        this.id = Number(quote.id);
        this.text = quote.name;
        this.available = quote.gender;
        this.owner=quote.owner;
    }
}