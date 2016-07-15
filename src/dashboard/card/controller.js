'use strict';

export default class CardCtrl {
    constructor(cardStorage) {
    	this.staff = cardStorage.staff;
    	this.cardStorage = cardStorage;
    }

    remove(person) {
        this.cardStorage.removeItem(person);
    }

	clear() {
        this.cardStorage.delStaff();
    }

    	
}