import {Enumerations} from "./client/enumerations/Enumerations.js";
import {jsDatepicker} from "./client/jsDatepicker.js";

export class ConstructorDisplay {
    static NUMBERS_OF_COLUMNS = 36;
    static NUMBERS_OF_ROWS = 36;

    static pageHTML;
    static numberOfColumns;
    static numberOfRows;

    static {
        ConstructorDisplay.pageHTML = document.createElement("pageHTML");
        ConstructorDisplay.pageHTML.className = "container";
        document.body.append(ConstructorDisplay.pageHTML);

        ConstructorDisplay.numberOfColumns = ConstructorDisplay.NUMBERS_OF_COLUMNS
        ConstructorDisplay.numberOfRows = ConstructorDisplay.NUMBERS_OF_ROWS
    }

    static setColumnsRows(numberOfColumns, numberOfRows) {
        ConstructorDisplay.numberOfColumns = numberOfColumns;
        ConstructorDisplay.numberOfRows = numberOfRows;

        ConstructorDisplay.pageHTML.style.gridTemplateColumns = `repeat(${numberOfColumns}, 1fr)`;
        ConstructorDisplay.pageHTML.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`;
    }

    static showObject(object) {
        let i = 0;
        let labels = object.getLabels();

        for (const objectKey in object) {
            if(typeof object[objectKey] != 'function') {
                let div = document.createElement("div");
                div.className = `box`;
                if (object.hasOwnProperty("span")) {
                    div.style.gridColumn = `span ${ConstructorDisplay.numberOfColumns / object.span()}`;
                } else {
                    div.style.gridColumn = `span ${ConstructorDisplay.numberOfColumns / Object.keys(object).length}`;
                }
                ConstructorDisplay.pageHTML.append(div);

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
                    input.placeholder = labels[i];
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

    static showButton(innerText, onclick, numberOfElements) {
        let div = document.createElement("div");
        div.className = `box`;
        div.style.gridColumn = `span ${ConstructorDisplay.numberOfColumns / numberOfElements}`;

        let button = document.createElement("button");
        button.innerText = innerText;
        button.onclick = onclick;
        div.append(button);
        ConstructorDisplay.pageHTML.append(div);
    }

    static wrapObjects(objects) {
        let keys = []
        let bodyObject = {};
        console.log(objects)
        for (const [index, object] of objects.entries()) {
            keys.push([])
            for (const objectKey in object) {
                if(typeof object[objectKey] != 'function') {
                    keys[index].push(objectKey)
                }
            }
        }

        for(const key of keys) {
            [].forEach.call(ConstructorDisplay.pageHTML.childNodes, function(childNode, index) {
                console.log(childNode.childNodes[0])
                if (childNode.childNodes[0].nodeName !== 'BUTTON') {
                    bodyObject[key[index]] = childNode.childNodes[1].value
                }
            });
        }

        console.log(bodyObject)
        return bodyObject;
    }
}