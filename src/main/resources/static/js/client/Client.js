"use strict";

import {BorrowersIncome} from "./entities/BorrowersIncome.js";
import {Borrower} from "./entities/Borrower.js";
import {ConstructorDisplay} from "../ConstructorDisplay.js";
import {Server} from "../Server.js";


export class Client {
    static numberOfColumns = ConstructorDisplay.NUMBERS_OF_COLUMNS;
    static numberOfRows = ConstructorDisplay.NUMBERS_OF_ROWS;

    static page = () => {
        ConstructorDisplay.pageHTML.innerHTML = null;
        ConstructorDisplay.setColumnsRows(Client.numberOfColumns, Client.numberOfRows)

        Client.showBorrowers();
        Client.showBorrowersIncome();

        ConstructorDisplay.showButton("Добавить", Client.request, 1);
    }

    static showBorrowers() {
        let borrower = new Borrower();
        let coBorrower = new Borrower();
        let object = {}
        let counter = 0
        let labels = []
        for (let keyElement in borrower) {
            labels.push(borrower.getLabels()[counter])
            labels.push(borrower.getLabels()[counter])
            object[keyElement + "1"] = borrower[keyElement]
            object[keyElement + "2"] = coBorrower[keyElement]
            ++counter
        }
        object.getLabels = () => {return labels}
        object.span = () => {return 2};
        ConstructorDisplay.showObject(object);
    }

    static showBorrowersIncome() {
        let borrowersIncome = new BorrowersIncome();
        ConstructorDisplay.showObject(borrowersIncome);
    }

    static request = () => {
        Server.newAnalysis(this.inputs.values())
    }
}