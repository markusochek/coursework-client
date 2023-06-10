"use strict";

import {Enumerations} from "./enumerations/Enumerations.js";
import {BorrowersIncome} from "./entities/BorrowersIncome.js";
import {Borrower} from "./entities/Borrower.js";

import {jsDatepicker} from "./jsDatepicker.js";

export class Client {
    pageHTML;
    numberOfColumns = 36;
    numberOfRows = 36;

    constructor(pageHTML, server) {
        this.pageHTML = pageHTML;
        this.pageHTML.className = "container";
        this.pageHTML.style.gridTemplateColumns = `repeat(${this.numberOfColumns}, 1fr)`;
        this.pageHTML.style.gridTemplateRows = `repeat(${this.numberOfRows}, 1fr)`;

        this.server = server;
    }

    page = () =>  {
        this.pageHTML.innerHTML = null;
        this.showBorrowers();
        this.showBorrowersIncome();

        this.showButtonAdd();
    }

    showBorrowers() {
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
        this.showObject(object);
    }

    showBorrowersIncome() {
        let borrowersIncome = new BorrowersIncome();
        this.showObject(borrowersIncome);
    }

    showObject(object) {
        let i = 0;
        let labels = object.getLabels();

        for (const objectKey in object) {
            if(typeof object[objectKey] != 'function') {
                let div = document.createElement("div");
                div.className = `box`;
                if (object.hasOwnProperty("span")) {
                    div.style.gridColumn = `span ${this.numberOfColumns / object.span()}`;
                } else {
                    div.style.gridColumn = `span ${this.numberOfColumns / Object.keys(object).length}`;
                }
                this.pageHTML.append(div);

                let label = document.createElement("label");
                label.innerHTML = labels[i];
                div.append(label);

                let purifiedObjectKey = objectKey.replace(/[0-9]/g, '')
                let enumeration = Enumerations.getEnumeration(purifiedObjectKey);
                if (enumeration) {
                    Enumerations.showEnumeration(div, enumeration);
                } else if (typeof object[objectKey] === "boolean") {
                    let select = document.createElement("select");

                    let option = document.createElement("option");
                    option.value = "false";
                    option.textContent = "Нет";
                    select.append(option);

                    option = document.createElement("option");
                    option.value = "true";
                    option.textContent = "Да";
                    select.append(option);

                    div.append(select);

                } else {
                    let input = document.createElement("input");
                    input.placeholder = object;
                    input.value = object[objectKey];
                    div.append(input);
                    if (objectKey === "version" || objectKey === "date" || objectKey.startsWith("dateOfBirth")) {
                        jsDatepicker(input);
                        input.value = object[objectKey].toLocaleDateString();
                    }
                }
                ++i;
            }
        }
    }

    showButtonAdd() {

        let button = document.createElement("button");
        button.innerText = "Добавить";
        button.onclick = this.request;

        this.pageHTML.append(button);
    }

    request = () => {
        this.server.newAnalysis(this.inputs.values())
    }
}