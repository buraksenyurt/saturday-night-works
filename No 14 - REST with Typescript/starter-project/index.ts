import { App } from "./app";
import * as path from "path";

const app = new App();
app.create({
    folders: [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }]
}).then(() => {
    console.log("Your fort is located at address - localhost:4000");
});