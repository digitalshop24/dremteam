'use strict';

export default class CatalogCtrl {
    constructor(staff) {
        this.staff = staff;
        this.filters = [];
        this.initFilters();
    }

    handleFilter(filterName) {
        const filer = this.getFilterByName(filterName) || {};
        if(filer.exclude) {
            if(filer.exclude == "all") {
                this.filters = [];
            } else {
                this.removeFilterByName(filer.exclude);
            }
        }
        if(this.isFilterSwitchedOn(filterName)) {
            this.removeFilterByName(filterName);
        } else {
            this.addFilter(filterName);
        }
    }

    removeFilterByName(filterName) {
        const filterIndex = this.filters.findIndex(f => f.name == filterName);
        if (filterIndex > -1) {
            this.filters.splice(filterIndex, 1);
        }
    }

    addFilter(filterName) {
        this.filters.push(this.getFilterByName(filterName));
    }

    isFilterSwitchedOn(filterName) {
        return this.filters.findIndex(f => f.name == filterName) > -1;
    }

    getFilterByName(filterName) {
        return this.allFilters.find(f => f.name == filterName);
    }

    initFilters() {
        this.allFilters = [
            {
                name: "models",
                exclude: "all",
                tagName: "Модели"
            },
            {
                name: "models.male",
                tagName: "Парни",
                exclude: "models.female"
            },
            {
                name: "models.female",
                tagName: "Девушки",
                exclude: "models.male"
            },
            {
                name: "models.hair.red",
                tagName: "Рыжие"
            },
            {
                name: "models.hair.dark",
                tagName: "Темные"
            },
            {
                name: "models.hair.blond",
                tagName: "Светлые"
            },
            {
                name: "photographs",
                tagName: "Фотографы",
                exclude: "all"
            },
            {
                name: "stylists",
                tagName: "Стилисты",
                exclude: "all"
            },
            {
                name: "set",
                tagName: "СПЕЦПРЕДЛОЖЕНИЯ",
                exclude: "all"
            }
        ]
    }
}