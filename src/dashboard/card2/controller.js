'use strict';

export default class Card2Ctrl {
    constructor(cardStorage) {
    	this.showThx = false;
    	this.staff = cardStorage.staff;
    	this.cardStorage = cardStorage;
    	this.allId = '';
    	console.log('this.allId', this.allId);

    }

    idModel() {
    	for (var index in this.staff) {  
    		this.allId +=  ' ID:' + this.staff[index].id;
    		// console.log(this.staff[index]);
		}
		console.log('console.log(this.allId);', this.allId);
    }
}