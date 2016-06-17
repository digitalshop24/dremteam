'use strict';

export default class CatalogCtrl {
    constructor(staff, sets) {
        this.staff = staff.concat(sets);
        this.filteredStaff = this.staff;
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
        this.filterStaff();
    }

    filterStaff() {
        this.filteredStaff = this.staff;
        this.filters.forEach(filter => {
            this.filteredStaff = this.filteredStaff.filter(filter.filter);
        });
    }

    removeFilterAndUpdate(filterName) {
        this.removeFilterByName(filterName);
        this.filterStaff();
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
                tagName: "Модели",
                filter: (person) => {
                    return person.profession == "model";
                }
            },
            {
                name: "models.male",
                tagName: "Парни",
                exclude: "models.female",
                filter: (person) => {
                    return person.profession == "model" && person.sex == "m";
                }
            },
            {
                name: "models.female",
                tagName: "Девушки",
                exclude: "models.male",
                filter: (person) => {
                    return person.profession == "model" && person.sex == "w";
                }
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
                exclude: "all",
                filter: (person) => {
                    return person.profession == "photographs";
                }
            },
            {
                name: "stylists",
                tagName: "Стилисты",
                exclude: "all",
                filter: (person) => {
                    return person.profession == "stylist";
                }
            },
            {
                name: "set",
                tagName: "СПЕЦПРЕДЛОЖЕНИЯ",
                exclude: "all",
                filter: (person) => {
                    return person.type == "suites";
                }
            }
        ]
    }
}