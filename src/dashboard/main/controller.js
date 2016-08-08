'use strict';

export default class MainCtrl {
    constructor(images, models, works, recruitingModal) {
        this.images = images;
        this.models = models;
        this.recruitingModal = recruitingModal;
        this.works = works.works;
        // this.worksPhotos = works.works[0].staff[0].photos;
        this.id_active = '';
        console.log(this.worksPhotos);
        console.log(this.works);
    }

    openRecruitingModal() {
        this.recruitingModal.open();
    }

    addFilterSet() {
        this.obj ='[{"name":"set","tagName":"СПЕЦПРЕДЛОЖЕНИЯ","exclude":["all"],"showSets":true}]';
        localStorage.setItem("filter", this.obj);
    }
}