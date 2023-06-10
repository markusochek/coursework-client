import {Client} from "./client/Client.js";
import {Server} from "./Server.js";

export class Index {
    static pageHTML = document.createElement("pageHTML");

    static server = new Server()
    static newAnalysis = new Client(Index.pageHTML, Index.server)

    static run() {
        document.body.append(Index.pageHTML);
        let button = document.createElement("button");
        button.innerText = "Новый анализ";
        button.onclick = Index.newAnalysis.page;
        Index.pageHTML.appendChild(button);
    }
}
Index.run()
