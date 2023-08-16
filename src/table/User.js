import { fakerEN } from "@faker-js/faker";
import { fakerDE } from "@faker-js/faker";
import { fakerRU } from "@faker-js/faker";
import {makeAutoObservable} from "mobx";


export default class User {
    constructor() {
        this._lang = "en";
        this._faker = fakerEN;
        this._seed = 42;
        this._listId = 0;
        makeAutoObservable(this)
    }

    setFaker(lang) {
        if (lang === "ru") {
            this._faker = fakerRU;
            this._lang = "ru";
            this.setZeroListId()
        } else if (lang === "de") {
            this._faker = fakerDE;
            this._lang = "de";
            this.setZeroListId()
        } else {
            this._faker = fakerEN;
            this._lang = "en";
            this.setZeroListId()
        }
    }

    setZeroListId() {
        this._listId = 0;
    }

    get lang() {
        return this._lang
    }

    get faker() {
        return this._faker;
    }

    get seed() {
        return this._seed;
    }

    get listId() {
        return this._listId++
    }

}