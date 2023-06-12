import {Status} from "./client/enumerations/Status.js";

export class Server {

    static async POST(object, url) {
        const response = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(object)
        });

        return await response.json();
    }

    static async GET(url) {
        const response = await fetch(url);
        return await response.json();
    }

    static async newAnalysis(values) {
        const response = await Server.POST(values, `api/newAnalysis`)

        switch (response.status) {
            case Status.OK: return ""
            case Status.ERROR: return ""
        }
    }
}