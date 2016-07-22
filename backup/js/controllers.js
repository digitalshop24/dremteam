 'use strict';

var modelsApp = angular.module('modelsApp', ['ngRoute','ngAnimate','yaMap','slick','ngResource','ngSanitize']);

 
modelsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when ('/',{
			templateUrl: 'template/home.html',
			controller: 'modelCtrl'

		})
		.when ('/catalog',{
			templateUrl: 'template/catalog.html',
			controller: 'catCtrl'

		})
		.when ('/catalog/:id',{
			templateUrl: 'template/model.html',
			controller: 'modelyCtrl'

		})
		.when ('/order',{
			templateUrl: 'template/order.html',
			controller: 'orderCtrl'

		})
		.when ('/contakt',{
			templateUrl: 'template/contakt.html',
			controller: 'contaktCtrl'

		})
		.when ('/set',{
			templateUrl: 'template/set.html',
			controller: 'setCtrl'

		})
		.when ('/thx',{
			templateUrl: 'template/thx.html',
			controller: 'thxCtrl'

		})
		.otherwise ({
			redirectTo:'/'
		});
}]);


angular.module('modelsApp')
.filter("filterP", function(){
		return function (value, f5) {
			
			var resault = [];
			var col = 0;
			if (value != undefined)
			for (var i = 0; i<value.length; i++) 
				for (var h = 0; h<value[i].prof.length; h++)
					for (var j = 0; j<100; j++) { //6 -количество фильтров
						var dubl = true;
						for (var u = 0; u<col; u++) {
							if (value[i].id == resault[u].id) { dubl = false;}
						}
						if ((f5[j] == value[i].prof[h])&& dubl==true) {
							resault[col] = value[i];
							col++;	
							dubl = true;
							break;
						}
					}	
				
			value = resault;
			return value;	
		}

});
angular.module('modelsApp')
.filter("filterH", function(){
		return function (value, f5) {
			
			var resault = [];
			var col = 0;

			if ((f5[0] == '')&&(f5[1] == '')&&(f5[2] == '')) {
				return value;
			}

			if (value != undefined) {
				for (var i = 0; i<value.length; i++){
					for ( var j = 0; j<f5.length; j++) {
						if (value[i].hair_color == f5[j]) {
							resault[col] = value[i];
							col++;
							break;
						}
					}
				} 
			}
			console.log('resault', resault);
			value = resault;
			return value;	
		}

});

angular.module('modelsApp')
.filter("filterSet", function(){
		return function (value, prof) {
			
			var resault = [];
			var col = 0;
			for (var i = 0; i<value.length; i++) 
				for (var j = 0; j<value[i].prof.length; j++ ) {
					if (value[i].prof[j] == prof) {
						resault[col] = value[i];
						col++;
						break;
					}
				}	
			
			value = resault;
			return value;	
		}

});



/* Controllers */
modelsApp.controller("modelCtrl",['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
// var
	$http.get('http://dt-agency.ru/api/v1/staff').success(function(data, status, headers, config) {
				$scope.imgcat = data;
	});

 	$rootScope.titles = 'Dreamteam - собери команду мечты!';
 	if ($rootScope.null_bask == undefined) {
 		$rootScope.null_bask =='disabled';
 	}


//
	$http.get('model/port.json').success(function(data, status, headers, config) {
		
		$scope.imgPortfolio = data;
	});

	$http.get('model/slide.json').success(function(data, status, headers, config) {
		
		$scope.imgslide = data;
	});
	
	//$http.get('model/catalog.json').success(function(data, status, headers, config) {
	//		$scope.imgcat = data;
			
//	});

	

	if ($rootScope.count == undefined ) { // проверка корзины на пустоту
		$rootScope.count = 0;
		$rootScope.basket = [
			{  }
		];
	}

$rootScope.fMain = '';


$scope.addFiltMain = function (c) {
	$rootScope.fMain = c;
}

$scope.pSS = function (pS) {
	$rootScope.pS = !$rootScope.pS;
}
if ($rootScope.fSex == undefined) {
	// $rootScope.fSex = '';
	$rootScope.border_fSexm = false;
	$rootScope.border_fSexw = false;
}
$rootScope.addFiltSex = function(sex, activ) {
	

	$rootScope.pS = false;
	$rootScope.model = true;
	$rootScope.otherModel = false;
	if (sex =='m')
		if (activ == false) {
			$rootScope.fSex = 'm';
			$rootScope.border_fSexm = true;
			$rootScope.border_fSexw = false;
		}
		else  {
			$rootScope.fSex = '';
			$rootScope.border_fSexm = false;
			$rootScope.border_fSexw = false;
		}
	if (sex =='w')
		if (activ == false) {
			$rootScope.fSex = 'w';
			$rootScope.border_fSexw = true;
			$rootScope.border_fSexm = false;
		}
		else  {
			$rootScope.fSex = '';
			$rootScope.border_fSexw = false;
			$rootScope.border_fSexm = false;
		}	
}

$scope.base = true;



$scope.filterMain = function (fio,prof) {
	console.log($scope.base);
	$scope.filt = fio;
	$scope.base = false;
	console.log($scope.base);
	$scope.fMainProf = prof;
}

}]);	



modelsApp.controller("catCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
$rootScope.titles = 'Dreamteam - каталог моделей'; 

if ($rootScope.col == undefined) {
 	$rootScope.col == 12;
}

if ($rootScope.null_bask == undefined) {
 		$rootScope.null_bask ='disabled';
 	}
	
if ($rootScope.count == undefined) {
	$rootScope.basket = [];
	$rootScope.count = 0;
} 

if ($rootScope.pS == undefined) {
	$rootScope.pS = false;
}
if ($rootScope.otherModel == undefined) {
	$rootScope.otherModel = false;
}
if ($rootScope.model == undefined) {
	$rootScope.model = true;
}


// console.log('$rootScope.fProf',$rootScope.fProf);
if ($rootScope.fProf == undefined) {
	$rootScope.fProf = {};
	//модели
	$rootScope.fProf[0] = 'Model';
	$rootScope.p1 = false;
		$rootScope.fProf[11] = 'Podium';
		$rootScope.p1_1 = false;
		$rootScope.fProf[12] = 'Photo';
		$rootScope.p1_2 = false;
	// end модели
	$rootScope.fProf[1] = 'Photograph';
	$rootScope.p2 = false;
	$rootScope.fProf[2] = 'Stylist';
	$rootScope.p3 = false; 
	$rootScope.fProf[3] = 'Visagiste';
	$rootScope.p4 = false;
	$rootScope.fProf[4] = 'Staff';
	$rootScope.p5 = false;
	$rootScope.fProf[51] = 'Barman';
	$rootScope.p5_1 = false;
	$rootScope.fProf[52] = 'Waiter';
	$rootScope.p5_2 = false;

	$rootScope.firstClick = false;
}
// console.log('$rootScope.fProf',$rootScope.fProf);
// console.log('$rootScope.firstClick',$rootScope.firstClick);
if ($rootScope.fSex == undefined) {
	// $rootScope.fSex = '';
	$rootScope.border_fSexm = false;
	$rootScope.border_fSexw = false;
}
if ($rootScope.fHair == undefined) {
	// $rootScope.fHair = '';
	$rootScope.border_fHair1 = false;
	$rootScope.border_fHair2 = false;
	$rootScope.border_fHair3 = false;
	$rootScope.fHair = [];
	console.log('$rootScope.fHair', $rootScope.fHair);
	$rootScope.fHair[0] = '';
	$rootScope.fHair[1] = '';
	$rootScope.fHair[2] = '';

}
if ($rootScope.fHeight == undefined) {
	// $rootScope.fSex = '';
	$rootScope.border_fHeightTo = false;
	$rootScope.border_fHeightDo = false;
}



	$http.get('http://dt-agency.ru/api/v1/staff').success(function(data, status, headers, config) {
			$rootScope.imgcat = data;
			
			$rootScope.imgcat = $scope.initShowBtn($rootScope.imgcat, $rootScope.basket);
			if (($rootScope.fMain != undefined) && ($rootScope.fMain != null) && ($rootScope.fMain != '')) { $scope.addFilt(false,$rootScope.fMain,true); }

			$scope.showBtn = function (id) {
			 	for (var i = 0; i < $rootScope.imgcat.length; i++) {
			 		if ($rootScope.imgcat[i].id == id) {
			 			return $rootScope.imgcat[i].showBtn;
			 		}
			 	}
			};

	}); 



	$http.get('http://dt-agency.ru/api/v1/suites').success(function(data, status, headers, config) {
		$rootScope.sets = data;
		
		$rootScope.sets = $scope.initShowBtnSet($rootScope.sets, $rootScope.basket);
		$scope.showBtnSet = function (id) {
			for (var i = 0; i < $rootScope.sets.length; i++) {
				if ($rootScope.sets[i].id == id) {
						return $rootScope.sets[i].showBtn;
					}
				}
		};
	});



	
	// используется для передачи данных о товаров находящихся в корзине 
	$scope.initShowBtn = function(im, bask) {
		console.log('im', im);
		console.log('bask', bask);
		// if (im[0].image == undefined) {

		if (bask.length == 0)  {
			for (var i = 0; i < im.length; i++) {
				im[i].showBtn = true;
			}	
			return im;
		}	
		for (var i = 0; i < im.length; i++) {
			for (var j = 0; j < bask.length; j++) {
				if (im[i].url == bask[j].url) {
					im[i].showBtn = false;
					break;
				}
				else { im[i].showBtn = true; }

			}		
		}	
		console.log('im', im);	
		return im;
	};
 $scope.load_more = function(c) {
 	console.log('c', c);
 	$rootScope.col = c;
 	$rootScope.col = $rootScope.col + 8;
 	console.log('$rootScope.col', $rootScope.col);
 }

	$scope.initShowBtnSet = function(im, bask) {
		
		for (var i = 0; i < im.length; i++) {
			for (var j = 0; j < bask.length; j++) {
				if (im[i].image == bask[j].url) {
					im[i].showBtn = false;
					break;
				}
				else { im[i].showBtn = true; }

			}		
		}	
			
		return im;
	};
	 	
		 	

	//Добавление товара в корзину		
	$rootScope.addModel = function(url) {
			$rootScope.basket[$rootScope.count] = {url: ""}; 
			$rootScope.basket[$rootScope.count].url = url;	
			$rootScope.count++;
			for (var i = 0; i < $rootScope.imgcat.length; i++) {
				if (url == $rootScope.imgcat[i].url ) {
					$rootScope.imgcat[i].showBtn = false;
					break;
				}
			}

			for (var i = 0; i < $rootScope.sets.length; i++) {
				
				
				if (url == $rootScope.sets[i].image ) {
					$rootScope.sets[i].showBtn = false;
					break;
				}
			}

			if ($rootScope.count == 0) $rootScope.null_bask =='disabled';
			else $rootScope.null_bask =='';
 	}
 				
	
	
	$rootScope.delModel = function(url) {
		if (($rootScope.count - 1) < 0) return;
		for (var i = 0; i <= $rootScope.basket.length - 1; i++) {
	 		if ( $rootScope.basket[i].url == url )
	 		$rootScope.basket.splice(i, 1) 		
	 	};
	 	$rootScope.count--;	
	 		for (var i = 0; i < $rootScope.imgcat.length; i++) {
				if (url == $rootScope.imgcat[i].url ) {
					$rootScope.imgcat[i].showBtn = true;
					break;
				}
			}
			for (var i = 0; i < $rootScope.sets.length; i++) {
				if (url == $rootScope.sets[i].image ) {
					$rootScope.sets[i].showBtn = true;
					break;
				}
			}
		
		if ($rootScope.count == 0) $rootScope.null_bask =='disabled';
			else $rootScope.null_bask =='';
	};
$scope.addFiltHeight = function(height, activ) {
	$rootScope.pS = false;
	$rootScope.otherModel = false;
	$rootScope.model = true;
		console.log('height', height);
		console.log('activ', activ);
	if (height == 'от 175') {
		if (activ == false) {
			$rootScope.border_fHeightOt = true;
			$rootScope.border_fHeightDo = false;
			$rootScope.fHeight = 'от 175';
		}
		else {
			$rootScope.border_fHeightOt = false;
			$rootScope.border_fHeightDo = false;
			$rootScope.fHeight = undefined;
		}
		
	}
	if (height == 'до 175') {
		if (activ == false) {
			$rootScope.border_fHeightOt = false;
			$rootScope.border_fHeightDo = true;
			$rootScope.fHeight = 'до 175';
		}
		else {
			$rootScope.border_fHeightOt = false;
			$rootScope.border_fHeightDo = false;
			$rootScope.fHeight = undefined;
		}
		
	}
}	
$scope.addFiltHair = function(hair, activ, b) {
	$rootScope.pS = false;
	$rootScope.otherModel = false;
	$rootScope.model = true;
	if (hair == 'светлые') 
		if (activ == false) {
			$rootScope.fHair[0] = 'светлые';
			$rootScope.border_fHair1 = true;
		}
		else {
			$rootScope.fHair[0] = '';
			$rootScope.border_fHair1 = false;
		}
	if (hair == 'темные') 
		if (activ == false) {
			$rootScope.fHair[1] = 'темные';
			$rootScope.border_fHair2 = true;
		}
		else {
			$rootScope.fHair[1] = '';
			$rootScope.border_fHair2 = false;
		}
	if (hair == 'рыжие') 
		if (activ == false) {
			$rootScope.fHair[2] = 'рыжие';
			$rootScope.border_fHair3 = true;
		}
		else {
			$rootScope.fHair[2] = '';
			$rootScope.border_fHair3 = false;
		}		
}



	
/* Что бы добавить новый пункт в каталог 
1. Добавить его в функцию addFilt с обнулением потомков
2. Добавить в самом пункте в каталоге соответствующие переменные
3. Добавить в Выбранное соответствущие теги
*/


	$rootScope.addFilt = function (a,b,c) { //a = firstClick, b = номер пункта фильтра, c = клик по пункту меню 
		
		$rootScope.otherModel = false;
		$rootScope.model = true;
		$rootScope.pS = false;
		// if (a == false) {
			$rootScope.fProf[0] = ''; 
			$rootScope.p1 = false;
				$rootScope.fProf[11] = '';
				$rootScope.p1_1 = false;
				$rootScope.fProf[12] = '';
				$rootScope.p1_2 = false;
			$rootScope.fProf[1] = ''; 
			$rootScope.p2 = false;
			$rootScope.fProf[2] = ''; 
			$rootScope.p3 = false;
			$rootScope.fProf[3] = ''; 
			$rootScope.p4 = false;
			$rootScope.fProf[4] = ''; 
			$rootScope.p5 = false;
				$rootScope.fProf[51] = ''; 
				$rootScope.p5_1 = false;
				$rootScope.fProf[52] = ''; 
				$rootScope.p5_2 = false;
			$rootScope.firstClick = true;

		// }
	

		if ((b == 0)&&(c == false)) { $rootScope.fProf[b] = 'Model'; $rootScope.p1 = true; }
		if ((b == 0)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.fProf[11] = ''; $rootScope.fProf[12] = ''; $rootScope.p1 = false; $rootScope.p1_1 = false; $rootScope.p1_2 = false;}
			if ((b == 11)&&(c == false)) { $rootScope.fProf[b] = 'Podium'; $rootScope.p1_1 = true; $rootScope.fProf[0] = ''; $rootScope.p1 = true;} 
			if ((b == 11)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p1_1 = false;}
			if ((b == 12)&&(c == false)) { $rootScope.fProf[b] = 'Photo'; $rootScope.p1_2 = true; $rootScope.fProf[0] = ''; $rootScope.p1 = true;}
			if ((b == 12)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p1_2 = false;}
		if ((b == 1)&&(c == false)) { $rootScope.fProf[b] = 'Photograph'; $rootScope.p2 = true;}
		if ((b == 1)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p2 = false;}
		if ((b == 2)&&(c == false)) { $rootScope.fProf[b] = 'Stylist'; $rootScope.p3 = true;}
		if ((b == 2)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p3 = false;}
		if ((b == 3)&&(c == false)) { $rootScope.fProf[b] = 'Visagiste'; $rootScope.p4 = true;}
		if ((b == 3)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p4 = false;}
		if ((b == 4)&&(c == false)) { $rootScope.fProf[b] = 'Staff'; $rootScope.p5 = true;} //Выбираем пункт меню
		if ((b == 4)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.fProf[51] = ''; $rootScope.fProf[52] = ''; $rootScope.p5 = false; $rootScope.p5_1 = false; $rootScope.p5_2 = false;} // Обнуляем пункт меню и его потомков и пункты его меню
			
			//Выбираем пункт меню потомка и обнуляем предка ВАЖНО!!!
			if ((b == 51)&&(c == false)) { $rootScope.fProf[b] = 'Barman'; $rootScope.p5_1 = true; $rootScope.fProf[4] = ''; $rootScope.p5 = true;} 
			if ((b == 51)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p5_1 = false;}
			if ((b == 52)&&(c == false)) { $rootScope.fProf[b] = 'Waiter'; $rootScope.p5_2 = true; $rootScope.fProf[4] = ''; $rootScope.p5 = true;}
			if ((b == 52)&&(c == true)) { $rootScope.fProf[b] = ''; $rootScope.p5_2 = false;}
	
	
//проверка на полностью пустой массив
		if (($rootScope.fProf[0] == '')&&($rootScope.fProf[1] == '')&&($rootScope.fProf[11] == '')
			&&($rootScope.fProf[12] == '')&&($rootScope.fProf[2] == '')&&($rootScope.fProf[3] == '')
			&&($rootScope.fProf[4] == '')&&($rootScope.fProf[51] == '')&&($rootScope.fProf[52] == '')) {
			
			$rootScope.fProf[0] = 'Model'; 
			$rootScope.p1 = false;
				$rootScope.fProf[11] = 'Podium';
				$rootScope.p1_1 = false;
				$rootScope.fProf[12] = 'Photo';
				$rootScope.p1_2 = false;
			$rootScope.fProf[1] = 'Photograph'; 
			$rootScope.p2 = false;
			$rootScope.fProf[2] = 'Stylist';  
			$rootScope.p3 = false;
			$rootScope.fProf[3] = 'Visagiste'; 
			$rootScope.p4 = false;
			$rootScope.fProf[4] = 'Staff'; 
			$rootScope.p5 = false;
				$rootScope.fProf[51] = 'Barman'; 
				$rootScope.p5_1 = false;
				$rootScope.fProf[52] = 'Waiter'; 
				$rootScope.p5_2 = false;
				$rootScope.firstClick = false;


		}
	
		if (b != 11)
			if (b != 12) {
				$rootScope.fHair[0] = '';
				$rootScope.border_fHair1 = false;
				$rootScope.fHair[1] = '';
				$rootScope.border_fHair2 = false;
				$rootScope.fHair[2] = '';
				$rootScope.border_fHair3 = false;
				$rootScope.fSex = '';
				$rootScope.border_fSexm = false;
				$rootScope.border_fSexw = false;
				$rootScope.fHeight = undefined;
				$rootScope.border_fHeightOt = false;
				$rootScope.border_fHeightDo = false;
		}	
	 	
}

$scope.ShowSpecial = function (a,b) { //a-массив сета b-профессия модели 
	var s = false;
	
	
	for (var i = 0; i<a.length; i++)
		for (var j = 0; j<a[i].prof.length; j++) {
			if (a[i].prof[j] == b) { s = true; }
		}
		
	return s;	

}

$scope.pSS = function (pS) {
	$rootScope.pS = !$rootScope.pS;
	$rootScope.otherModel = false;
	if ($rootScope.pS == false) $rootScope.model = true;
	else $rootScope.model = false;


}

$scope.other = function (otherModel) {
	$rootScope.pS = false
	$rootScope.otherModel = true;
	$rootScope.model = false;
}

}]);	

modelsApp.controller("orderCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
$rootScope.titles = 'Dreamteam - корзина';
if ($rootScope.null_bask == undefined) {
 		$rootScope.null_bask =='disabled';
 	}
	//Добавление товара в корзину		
	// $scope.addModel = function(url) {
	// 	$rootScope.basket[$rootScope.count] = {url: ""}; 
	// 	$rootScope.basket[$rootScope.count].url = url;	
	// 	$rootScope.count++;
		
	// };
	// $scope.delModel = function(url) {
	// 	for (var i = 0; i <= $rootScope.basket.length - 1; i++) {
	// 		if ( $rootScope.basket[i].url == url )
	// 		$rootScope.basket.splice(i, 1) 		
	// 	};
	// 	$rootScope.count--;	
	// };

	
	
	

}]);	

modelsApp.controller("contaktCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
$rootScope.titles = 'Dreamteam - контакты';
if ($rootScope.null_bask == undefined) {
 		$rootScope.null_bask =='disabled';
 	}
$scope.point = {
    geometry:{
        type:'Point',
        coordinates:[37.635485,55.737451]
    },
    properties: {
        name: 'Считаем'
    }
};

}]);

modelsApp.controller("thxCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
}]);
modelsApp.controller("modelyCtrl", ['$scope','$http', '$rootScope', '$location','$routeParams', function($scope, $http, $rootScope, $location, $routeParams) {
if ($rootScope.null_bask == undefined) {
 		$rootScope.null_bask =='disabled';
 	}
	$scope.mId = $routeParams.id;
	var url = 'http://dt-agency.ru/api/v1/staff/'+$scope.mId;
	$http.get(url).success(function(data, status, headers, config) {
		$scope.img = data;
		$scope.imgMain = $scope.img.url
		$scope.showBtn = function (id) {
		 	for (var i = 0; i < $rootScope.imgcat.length; i++) {
		 		if ($rootScope.imgcat[i].id == id) {
		 			return $rootScope.imgcat[i].showBtn;
			 	}
		 	}
		};
		$rootScope.titles = 'Dreamteam - ' + $scope.img.fio;	
	});



	$scope.imgMainC = function(url)  {
		$scope.imgMain = url;

	}

}]);
modelsApp.controller("setCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
}]);


		//Прилипание меню в каталоге	
/*
		var sticky = document.querySelector('.sticky');
		var origOffsetY = sticky.offsetTop;

		function onScroll(e) {
		  window.scrollY >= origOffsetY ? sticky.classList.add('fixed') :
		                                  sticky.classList.remove('fixed');
		}
		document.addEventListener('scroll', onScroll);
*/