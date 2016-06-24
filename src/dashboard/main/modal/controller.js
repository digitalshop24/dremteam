'use strict';

export default class StaffCtrl {
    constructor($modal){
        this.modal = $modal;
    }
    
    close() {
        this.modal.close();
    }
}
