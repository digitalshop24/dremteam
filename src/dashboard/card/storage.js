'use strict';

export default class CardStorage {
    constructor($localStorage) {

        this.storage = $localStorage.$default({
            staff: []
        });
        console.log('qwer', this.storage);
        this.staff = this.storage.staff;
        this.updateCounters();
    }

    get staff() {
        return this._staff;
    }

    set staff(value) {
        this.storage.staff = this._staff = value;
        this.updateCounters();
    }

    delStaff() {
        this.storage.staff = [];
        this.staff = this.storage.staff;
        this.updateCounters();

    }

    addItem(person) {
        const found = this.staff.find(i => i.id == person.id);
        if (!found) {
            this.staff.push(person);
            this.updateCounters();
        }
    }

    removeItem(person) {
        const itemIndex = this.staff.findIndex(i => i.id == person.id);
        if (itemIndex > -1) {
            this.staff.splice(itemIndex, 1);
        }
        this.updateCounters();
    }

    isContained(person) {
        return this.staff.findIndex(i => i.id == person.id) > -1;
    }

    updateCounters() {
        this.updateAmountValue();
    }

    updateAmountValue() {
        this.staffAmount = this.staff.length;
    }
}
