'use strict';

export default class ModelCtrl {
    constructor(person) {
        this.person = person;
        this.responsive = [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 695,
              settings: {
                slidesToShow: 1,
              }
            }
            

          ];
    }
}