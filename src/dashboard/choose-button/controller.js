'use strict';

export default class ChooseButtonCtrl {
    constructor(cardStorage) {
        this.cardStorage = cardStorage;
    }

    add() {
        this.cardStorage.addItem(this.person);
    }
}
