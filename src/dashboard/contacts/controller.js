'use strict';

export default class СontactsCtrl {
    constructor() {
        this.coordinates = [37.628704, 55.732124];
        this.point = {
            geometry: {
                type: 'Point',
                coordinates: this.coordinates
            },
            properties: {
                balloonContent: 'DreamTeam',
                hintContent: 'DreamTeam'
            }
        }
    }
}