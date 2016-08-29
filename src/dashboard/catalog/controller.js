'use strict';

export default class CatalogCtrl {
    constructor(staff, sets, catalogService, staffService, $rootScope, api) {
        this.api = api
        this.showOthe = JSON.parse(localStorage.getItem("showOthe"));
        this.rootScope = $rootScope;
        console.log(localStorage);
        if (this.rootScope.showItem == undefined) {
            this.rootScope.showItem = 12;
        } 
        this.staffService = staffService;
        this.catalogService = catalogService;
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
        }
        else {
            this.filt = JSON.parse(localStorage.getItem("filter"));
            for (this.i = 0; this.i < this.filt.length; this.i++) {
                this.handleFilter(this.filt[this.i].name);
            }
        }

        // console.log('11111', localStorage.getItem("currentPage"));
        if ((localStorage.getItem("currentPage") == undefined)) {
            this.currentPage = 0;
        }
        else {
            this.currentPage = JSON.parse(localStorage.getItem("currentPage"));
        }

        this.itemsPerPage = 12;
        this.modelShow = [];
        console.log('start', this.currentPage);
        this.paginationGet(this.currentPage);
        
    }
   
    showItemAdd() {
        this.rootScope.showItem += 12;
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
        // this.paginationGet(0);
    }

    filterStaff() {
        this.filteredStaff = this.staff;
        this.filters.forEach(filter => {
            this.filteredStaff = this.filteredStaff.filter(filter.filter);
        });
        // this.paginationGet(0);
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
                if (filterIndex == 0 ) this.showOthe = false;
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

    findFilter(filterName) {
        if (this.filters.find(f => f.name == filterName) == undefined) return false;
        else return true;
    }


    initFilters() {
        this.allFilters = [
            {
                name: "models",
                exclude: ["all"],
                tagName: "Модели",
                showSets: false,
                filter: (person) => {
                    return person.profession == "model";
                }
            },
            {
                name: "models.stars",
                exclude: ["all"],
                tagName: "Звезды",
                showSets: false,
                filter: (person) => {
                    return person.subprofession == "stars";
                }
            },
            {
                name: "models.male",
                tagName: "Парни",
                showSets: false,
                exclude: ["models.female"],
                filter: (person) => {
                    return person.profession == "model" && person.sex == "m";
                }
            },
            {
                name: "models.female",
                tagName: "Девушки",
                showSets: false,
                exclude: ["models.male"],
                filter: (person) => {
                    return person.profession == "model" && person.sex == "w";
                }
            },
            {
                name: "models.height",
                tagName: "Рост",
                showSets: false,
                filter: (person) => {
                    return person.height >= this.slider.minValue && person.height <= this.slider.maxValue;
                }
            },
            {
                name: "models.hair.red",
                tagName: "Рыжие",
                showSets: false,
                filter: (person) => {
                    return person.profession == "model" && this.getEnabledHairColors().indexOf(person.hair_color) > -1;
                }
            },
            {
                name: "models.hair.dark",
                tagName: "Шатенки",
                showSets: false,
                filter: (person) => {
                    return person.profession == "model" && this.getEnabledHairColors().indexOf(person.hair_color) > -1;
                }
            },
            {
                name: "models.hair.blond",
                tagName: "Блондинки",
                showSets: false,
                filter: (person) => {
                    return person.profession == "model" && this.getEnabledHairColors().indexOf(person.hair_color) > -1;
                }
            },
            {
                name: "photographs",
                tagName: "Фотографы",
                exclude: ["all"],
                showSets: false,
                filter: (person) => {
                    return person.profession == "photograph";
                }
            },
            {
                name: "stylists",
                tagName: "Стилисты",
                exclude: ["all"],
                showSets: false,
                filter: (person) => {
                    return person.profession == "stylist";
                }
            },
            {
                name: "keytring",
                tagName: "Кейтеринг",
                exclude: ["all"],
                showSets: false,
                filter: (person) => {
                    return person.profession == "keytring";
                }
            },
            {
                name: "staff",
                tagName: "Staff",
                exclude: ["all"],
                showSets: false,
                filter: (person) => {
                    return person.profession == "staff";
                }
            },
            {
                name: "staff.barman",
                tagName: "Бармены",
                exclude: ["staff.waiter"],
                showSets: false,
                filter: (person) => {
                    return person.subprofession == "barman"
                }
            },
            {
                name: "staff.waiter",
                tagName: "Официанты",
                exclude: ["staff.barman"],
                showSets: false,
                filter: (person) => {
                    return person.subprofession == "waiter";
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
            },
            {
                name: "visagiste",
                tagName: "Визажисты",
                exclude: ["all"],
                showSets: false,
                filter: (person) => {
                    return person.profession == "visagiste";
                }
            },
        ]
    }

    getEnabledHairColors() {
        return [
            this.isFilterSwitchedOn('models.hair.red') ? 'red' : '',
            this.isFilterSwitchedOn('models.hair.dark') ? 'dark' : '',
            this.isFilterSwitchedOn('models.hair.blond') ? 'blond' : ''
        ]
    }
    getEnabledSub() {
        return [
            this.isFilterSwitchedOn('models.hair.red') ? 'red' : '',
            this.isFilterSwitchedOn('models.hair.dark') ? 'dark' : '',
            this.isFilterSwitchedOn('models.hair.blond') ? 'blond' : ''
        ]
    }

    addTemplate(bool) {
        this.showOthe = bool;
        localStorage.setItem("showOthe", this.showOthe);
        
    }

    paginationGet(num) {
      this.maxPage = Math.ceil(this.filteredStaff.length/this.itemsPerPage);
      this.maxPage--;
      num = angular.isUndefined(num)?0:num;
      if (num < 0) { num = 0; return; } 
      if (num > this.maxPage) { num = this.maxPage; return; }
      this.first = this.itemsPerPage*num;
      this.last = this.first + this.itemsPerPage;
      this.currentPage = num;
      this.last = this.last > this.filteredStaff.length ? (this.filteredStaff.length-1) : this.last;
      this.modelShow = this.filteredStaff.slice(this.first, this.last);
      localStorage.setItem('currentPage', this.currentPage);
      console.log('end', localStorage.getItem("currentPage"));
    }

}