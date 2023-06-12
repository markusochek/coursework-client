import {Client} from "./client/Client.js";
import {AuthenticationDisplay} from "./authentication/AuthenticationDisplay.js";
import {AuthorizationDisplay} from "./authentication/AuthorizationDisplay.js";
import {RegistrationDisplay} from "./authentication/RegistrationDisplay.js";
import {ConstructorDisplay} from "./ConstructorDisplay.js";

export class Index {
    static {
        AuthorizationDisplay.numberOfColumns = 12;
        AuthorizationDisplay.numberOfRows = 6;

        RegistrationDisplay.numberOfColumns = 12;
        RegistrationDisplay.numberOfRows = 6;

        AuthenticationDisplay.numberOfColumns = 12;
        AuthenticationDisplay.numberOfRows = 6;

        Client.numberOfColumns = 36;
        Client.numberOfRows = 12;
    }

     static page = () => {
         ConstructorDisplay.showButton("Добавить данные", Client.page, 1);
     }
}

Index.page()
