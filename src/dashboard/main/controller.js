'use strict';

export default class MainCtrl {
    constructor(images, models, works, recruitingModal) {
        this.images = images;
        this.models = models;
        this.recruitingModal = recruitingModal;
        this.works = works.works;
        this.worksPhotos = works.photos;
        this.id_active = '';
    }

    openRecruitingModal() {
        this.recruitingModal.open();
    }

    addFilterSet() {
        this.obj ='[{"name":"set","tagName":"СПЕЦПРЕДЛОЖЕНИЯ","exclude":["all"],"showSets":true}]';
        localStorage.setItem("filter", this.obj);
    }
}