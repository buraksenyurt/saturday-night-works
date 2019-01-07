import { DefaultController } from "./controllers/default_controller";
import { QuoteController } from "./controllers/quote_controller";

export const routes = [{
    path: "/default",
    controller: DefaultController
}, {
    path: "/quote",
    controller: QuoteController
}];