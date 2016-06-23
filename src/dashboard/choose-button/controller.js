'use strict';

export default class ChooseButtonCtrl {
    constructor(cardStorage) {
        this.cardStorage = cardStorage;
        this.inCard = cardStorage.isContained(this.person);
    }

    add() {
        if(this.inCard) {
            this.cardStorage.removeItem(this.person);
            this.inCard = false;
        } else {
            this.cardStorage.addItem(this.person);
            this.inCard = true;
        }

    }
}
