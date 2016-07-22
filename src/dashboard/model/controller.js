'use strict';

export default class ModelCtrl {
    constructor(person) {
        this.person = person;
        this.bigfoto = this.person.photo.medium;
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

    checkBigFoto(link) {
      this.bigfoto = link;
    }
    colorHair(hair_color) {
      if (hair_color == 'dark') return 'Темный';
      if (hair_color == 'blond') return 'Светлый';
      if (hair_color == 'red') return 'Рыжий';
    }
}