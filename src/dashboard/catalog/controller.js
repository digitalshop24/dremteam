'use strict';

export default class CatalogCtrl {
    constructor(staff, sets) {
        staff.sort((a,b) => {
            if (a.sex == 'w' && b.sex == 'm') {
                return -1;
            }
            if (a.sex == 'm' && b.sex == 'w') {
                return 1;
            }
            return 0;
        });

        this.staff = staff.concat(sets);
        
        this.filteredStaff = this.staff;
        this.filters = [];
        this.showOthe = false;
        this.i = 0;
        this.slider = {
            minValue: 150,
            maxValue: 200,
            options: {
                floor: 150,
                ceil: 200,
                step: 1,
                onChange: () => {
                    this.removeFilters(['models.height']);
                    this.handleFilter('models.height');
                }
            }
        };
        this.initFilters();
        this.obj = "";
        if ((localStorage.getItem("filter") == undefined)) {
            this.handleFilter('models');
            console.log('111',this.filters);
        }
        else {
            this.filt = JSON.parse(localStorage.getItem("filter"));
            for (this.i = 0; this.i < this.filt.length; this.i++) {
                this.handleFilter(this.filt[this.i].name);
            }
            console.log('222', this.filt);
        }
    }

    handleFilter(filterName) {
        const filter = this.getFilterByName(filterName) || {};
        if(filter.exclude) {
            if(filter.exclude[0] == "all") {
                this.filters = [];
            } else {
                this.removeFilters(filter.exclude);
            }
        }
        if(this.isFilterSwitchedOn(filterName)) {
            this.removeFilters([filterName]);
        } else {
            this.addFilter(filterName);
        }
        this.filterStaff();
        this.showSets = filter.showSets;
        this.obj =JSON.stringify(this.filters);
        localStorage.setItem("filter", this.obj);
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
                name: "models.height",
                tagName: "Рост",
                filter: (person) => {
                    return person.height >= this.slider.minValue && person.height <= this.slider.maxValue;
                }
            },
            {
                name: "models.hair.red",
                tagName: "Рыжие",
                filter: (person) => {
                    return person.profession == "model" && this.getEnabledHairColors().indexOf(person.hair_color) > -1;
                }
            },
            {
                name: "models.hair.dark",
                tagName: "Темные",
                filter: (person) => {
                    return person.profession == "model" && this.getEnabledHairColors().indexOf(person.hair_color) > -1;
                }
            },
            {
                name: "models.hair.blond",
                tagName: "Светлые",
                filter: (person) => {
                    return person.profession == "model" && this.getEnabledHairColors().indexOf(person.hair_color) > -1;
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

    getEnabledHairColors() {
        return [
            this.isFilterSwitchedOn('models.hair.red') ? 'red' : '',
            this.isFilterSwitchedOn('models.hair.dark') ? 'dark' : '',
            this.isFilterSwitchedOn('models.hair.blond') ? 'blond' : ''
        ]
    }
}