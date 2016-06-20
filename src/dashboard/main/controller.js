'use strict';

export default class MainCtrl {
    constructor(images, models, works) {
        this.images = images;
        this.models = models;
        this.works = works.works;
        this.worksPhotos = works.photos;
    }
}