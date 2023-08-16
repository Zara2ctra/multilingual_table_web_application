import _random from "lodash/random";
import {getRandomEnglishChar, getRandomGermanChar, getRandomRussianChar} from "../utils/languages"

export class MistakeGenerator {
    constructor(record, numberOfMistakes, faker, lang) {
        this.record = record;
        this.numberOfMistakes = numberOfMistakes;
        this.faker = faker;
        this.lang = lang;
        this.field = ["fullName", "address", "phone_number"];
    }

    addRandomChar(currentField, positionToAdd, randomChar) {
        this.record[currentField] =
            this.record[currentField].substring(0, positionToAdd) + randomChar + this.record[currentField].substring(positionToAdd);
    }

    deleteRandomChar(currentField) {
        const positionToDelete = _random(0, this.record[currentField].length - 1);
        this.record[currentField] =
            this.record[currentField].substring(0, positionToDelete) +
            this.record[currentField].substring(positionToDelete + 1);
    }

    swapTwoRandomChars(currentField) {
        const positionToSwap = _random(0, this.record[currentField].length - 2);
        const chars = this.record[currentField].split('');
        const temp = chars[positionToSwap];
        chars[positionToSwap] = chars[positionToSwap + 1];
        chars[positionToSwap + 1] = temp;
        this.record[currentField] = chars.join('');
    }

    randomMistakeSelection() {
        for (let i = 0; i < this.numberOfMistakes; i++) {
            let currentField = this.field[_random(0, 2)];
            let chosenMistake = _random(1, 3);
            if (this.record[currentField].length < 5) {
                chosenMistake = _random(2, 3)
            } else if (this.record[currentField].length > 60) {
                chosenMistake = [1, 3][_random(0, 1)]
            }
            this.generateSelectMistake(chosenMistake, currentField)
        }
    }

    generateSelectMistake(chosenMistake, currentField) {
        switch (chosenMistake) {
            case 1:
                this.deleteRandomChar(currentField)
                break;
            case 2:
                const positionToAdd = _random(0, this.record[currentField].length);
                if (this.lang === "en") {
                    this.addRandomChar(currentField, positionToAdd, getRandomEnglishChar())
                } else if (this.lang === "ru") {
                    this.addRandomChar(currentField, positionToAdd, getRandomRussianChar())
                } else {
                    this.addRandomChar(currentField, positionToAdd, getRandomGermanChar())
                }
                break;
            case 3:
                this.swapTwoRandomChars(currentField)
                break;
            default:
                break;
        }
    }
}