import {ConstructorDisplay} from "../ConstructorDisplay.js";
import {User} from "./entities/User.js";
import {Server} from "../Server.js";


export class AuthorizationDisplay {
    static numberOfColumns = ConstructorDisplay.NUMBERS_OF_COLUMNS;
    static numberOfRows = ConstructorDisplay.NUMBERS_OF_ROWS;

    static user;

    static {
        AuthorizationDisplay.user = new User();
    }

    static page = () => {
        ConstructorDisplay.pageHTML.innerHTML = null;
        ConstructorDisplay.setColumnsRows(AuthorizationDisplay.numberOfColumns, AuthorizationDisplay.numberOfRows)

        ConstructorDisplay.showObject(AuthorizationDisplay.user);

        ConstructorDisplay.showButton("Авторизоваться", AuthorizationDisplay.request, 1);
    }


    static request = () => {
        Server.POST(
            'authorization',
            ConstructorDisplay.wrapObjects([AuthorizationDisplay.user]),
            'authorization successful',
            'authorization error')
            .then(response => console.log(response))
    }
}