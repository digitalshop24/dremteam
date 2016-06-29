'use strict';

export default class StaffCtrl {
    constructor($modalInstance){
        this.modalInstance = $modalInstance;
    }
    
    close() { 
        this.modalInstance.close();
    }
}
