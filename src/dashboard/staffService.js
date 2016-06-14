'use strict';

export default class StaffService {
    constructor(api) {
        this.api = api;
    }

    getStaffForMain() {
        return this.api.get('/staff/main_page').then((res) => {
            return res.data;
        });
    }
}
