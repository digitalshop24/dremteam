'use strict';

export default class MainCtrl {
    constructor(images, models, works, recruitingModal) {
        this.images = images;
        this.models = models;
        this.recruitingModal = recruitingModal;
        this.works = works.works;
        this.worksPhotos = works.photos;
        console.log(works);
    }

    openRecruitingModal() {
        this.recruitingModal.open();
    }
}