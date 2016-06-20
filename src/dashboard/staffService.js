'use strict';

export default class StaffService {
    constructor(api) {
        this.api = api;
    }

    getStaff(main) {
        return this.api.get('/staff', {
            params: {
                main: main
            }
        }).then((res) => {
            return res.data.items;
        });
    }

    getSets() {
        return this.api.get('/suites').then((res) => {
            return res.data.items;
        });
    }
}
