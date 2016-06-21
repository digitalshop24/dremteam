'use strict';

export default class ChooseButtonCtrl {
    constructor(cardStorage) {
        this.cardStorage = cardStorage;
        this.inCard = cardStorage.isContained(this.person);
    }

    add() {
        this.cardStorage.addItem(this.person);
        this.inCard = true;
    }
}
