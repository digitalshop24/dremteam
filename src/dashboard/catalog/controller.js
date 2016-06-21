'use strict';

export default class CatalogCtrl {
    constructor(staff, sets) {
        this.staff = staff.concat(sets);
        this.filteredStaff = this.staff;
        this.filters = [];
        this.initFilters();
        this.handleFilter('models');
    }

    handleFilter(filterName) {
        const filer = this.getFilterByName(filterName) || {};
        if(filer.exclude) {
            if(filer.exclude[0] == "all") {
                this.filters = [];
            } else {
                this.removeFilters(filer.exclude);
            }
        }
        if(this.isFilterSwitchedOn(filterName)) {
            this.removeFilters([filterName]);
        } else {
            this.addFilter(filterName);
        }
        this.filterStaff();
        this.showSets = filer.showSets;
    }

    filterStaff() {
        this.filteredStaff = this.staff;
        this.filters.forEach(filter => {
            this.filteredStaff = this.filteredStaff.filter(filter.filter);
        });
    }

    removeFilterAndUpdate(filterName) {
        this.removeFilters([filterName]);
        this.filterStaff();
    }

    removeFilters(filters) {
        filters.forEach((filterName) => {
            const filterIndex = this.filters.findIndex(f => f.name == filterName);
            if (filterIndex > -1) {
                this.filters.splice(filterIndex, 1);
            }
        });
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
                exclude: ["all"],
                tagName: "Модели",
                filter: (person) => {
                    return person.profession == "model";
                }
            },
            {
                name: "models.male",
                tagName: "Парни",
                exclude: ["models.female"],
                filter: (person) => {
                    return person.profession == "model" && person.sex == "m";
                }
            },
            {
                name: "models.female",
                tagName: "Девушки",
                exclude: ["models.male"],
                filter: (person) => {
                    return person.profession == "model" && person.sex == "w";
                }
            },
            {
                name: "models.hair.red",
                tagName: "Рыжие",
                exclude: ["models.hair.dark", "models.hair.blond"],
                filter: (person) => {
                    return person.profession == "model" && person.hair_color == "red";
                }
            },
            {
                name: "models.hair.dark",
                tagName: "Темные",
                exclude: ["models.hair.red", "models.hair.blond"],
                filter: (person) => {
                    return person.profession == "model" && person.hair_color == "dark";
                }
            },
            {
                name: "models.hair.blond",
                tagName: "Светлые",
                exclude: ["models.hair.red", "models.hair.dark"],
                filter: (person) => {
                    return person.profession == "model" && person.hair_color == "blond";
                }
            },
            {
                name: "photographs",
                tagName: "Фотографы",
                exclude: ["all"],
                filter: (person) => {
                    return person.profession == "photograph";
                }
            },
            {
                name: "stylists",
                tagName: "Стилисты",
                exclude: ["all"],
                filter: (person) => {
                    return person.profession == "stylist";
                }
            },
            {
                name: "set",
                tagName: "СПЕЦПРЕДЛОЖЕНИЯ",
                exclude: ["all"],
                showSets: true,
                filter: (person) => {
                    return person.type == "suites";
                }
            }
        ]
    }
}