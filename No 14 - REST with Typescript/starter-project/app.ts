import { Fort } from 'fortjs';
import { routes } from './routes';
import * as path from "path";

export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
    }
}

