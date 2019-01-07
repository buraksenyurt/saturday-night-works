import { Fort } from 'fortjs';
import { routes } from './routes';
import { FortViewEngine } from 'eshtml';
import * as path from "path";

export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = FortViewEngine;
    }
}

new App().create({
    defaultPath: "default",
    folders: [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }]
}).then(() => {
    console.log("Your fort is located at address - localhost:4000");
})

