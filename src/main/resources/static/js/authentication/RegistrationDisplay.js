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

        RegistrationDisplay.user.span = () => {return 1;}
        ConstructorDisplay.showObject(RegistrationDisplay.user);

        ConstructorDisplay.showButton("Зарегистрироваться", RegistrationDisplay.request, 1);
    }

    static request = () => {
        Server.newAnalysis(this.inputs.values())
    }
}