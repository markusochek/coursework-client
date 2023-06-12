import {ConstructorDisplay} from "../ConstructorDisplay.js";
import {User} from "./entities/User.js";
import {Server} from "../Server.js";


export class RegistrationDisplay {
    static numberOfColumns = ConstructorDisplay.NUMBERS_OF_COLUMNS;
    static numberOfRows = ConstructorDisplay.NUMBERS_OF_ROWS;

    static user;

    static {
        RegistrationDisplay.user = new User();
    }



    static page = () => {
        ConstructorDisplay.pageHTML.innerHTML = null;
        ConstructorDisplay.setColumnsRows(RegistrationDisplay.numberOfColumns, RegistrationDisplay.numberOfRows)

        ConstructorDisplay.showObject(RegistrationDisplay.user);

        ConstructorDisplay.showButton("Зарегистрироваться", RegistrationDisplay.request, 1);
    }

    static request = () => {
        Server.POST(
            'registration',
            ConstructorDisplay.wrapObjects([RegistrationDisplay.user]),
            'registration successful',
            'registration error')
            .then(response => console.log(response))
    }
}