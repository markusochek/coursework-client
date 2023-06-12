import {Status} from "./client/enumerations/Status.js";

export class Server {

    static async POST(path, object, OkMessage, ErrorMessage) {
        let request = await fetch(`api/${path}`,
            {method: "POST",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(object)
        });
        let response = await request.json();

        switch (response.status) {
            case Status.OK: return OkMessage
            case Status.ERROR: return ErrorMessage
        }
    }

    static async GET(path, OkMessage, ErrorMessage) {
        let request = await fetch(`api/${path}`);
        let response = await request.json();

        switch (response.status) {
            case Status.OK: return OkMessage
            case Status.ERROR: return ErrorMessage
        }
    }
}