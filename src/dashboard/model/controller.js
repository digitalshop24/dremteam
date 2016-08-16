'use strict';

export default class ModelCtrl {
    constructor(person, $sce) {
        this.person = person;
        this.bigfoto = this.person.photo.medium;
        this.sce = $sce;
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
      console.log(link);
      this.bigfoto = link;
    }
    colorHair(hair_color) {
      if (hair_color == 'dark') return 'Шатенки';
      if (hair_color == 'blond') return 'Блондинки';
      if (hair_color == 'red') return 'Рыжий';
    }
}