import _random from "lodash/random";
import { faker } from "@faker-js/faker";

export function getRandomGermanChar() {
    let germanAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "Ä", "Ö", "Ü", "ß"
    ];
    germanAlphabet = [...germanAlphabet, ...germanAlphabet.map(e => {
        return e.toLowerCase();
    })]
    return germanAlphabet[_random(0, 34)];
}

export function getRandomEnglishChar() {
    return faker.string.alpha();
}

export function getRandomRussianChar() {
    return String.fromCharCode(1040 + _random(0, 63))
}