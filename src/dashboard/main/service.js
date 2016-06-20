'use strict';

export default class MainService {
    constructor(api) {
        this.api = api;
    }

    getImagesForSlider() {
        return this.api.get('/general/main_slider').then((res) => {
            return res.data;
        });
    }

    getWorks() {
        return this.api.get('/works').then((res) => {
            return res.data;
        });
    }
}
