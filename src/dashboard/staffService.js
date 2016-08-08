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
    getStaff20(main) {
        return this.api.get('/staff', {
            params: {
                main: main,
                page: 1,
                per_page: 10
            }
        }).then((res) => {
            return res.data.items;
        });
    }

    getById(id) {
        return this.api.get(`/staff/${id}`).then((res) => {
            return res.data;
        });
    }

    getSets() {
        return this.api.get('/suites').then((res) => {
            return res.data.items;
        });
    }
}
