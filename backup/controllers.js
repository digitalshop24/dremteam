 'use strict';



var modelsApp = angular.module('modelsApp', ['ngRoute','ngAnimate','slick']);


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
			//console.log ('This value:', value);
			//console.log ('//////////');
			//console.log ('This f5:', f5);
			//console.log ('//////////');
			var resault = [];
			var col = 0;
			for (var i = 0; i<value.length; i++) 
				for (var h = 0; h<value[i].prof.length; h++)
					for (var j = 0; j<6; j++) {
						if (f5[j] == value[i].prof[h]) {
							resault[col] = value[i];
							col++;	
							break;
						}
					}	
				
			value = resault;
			//console.log ('This resault:', resault);
			return value;	
		}

});

angular.module('modelsApp')
.filter("filterSet", function(){
		return function (value, prof) {
			//console.log ('This value:', value);
			//console.log ('//////////');
			//console.log ('This value.prof:', value[0].prof);
			//console.log ('//////////');
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
			console.log ('This resault:', resault);
			value = resault;
			return value;	
		}

});


/* Controllers */
modelsApp.controller("modelCtrl",['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
 
	$http.get('model/port.json').success(function(data, status, headers, config) {
		
		$scope.imgPortfolio = data;
	});

	$http.get('model/slide.json').success(function(data, status, headers, config) {
		
		$scope.imgslide = data;
	});
	
	//$http.get('model/catalog.json').success(function(data, status, headers, config) {
	//		$scope.imgcat = data;
			
//	});

	$http.get('http://dt-agency.ru/api/v1/staff').success(function(data, status, headers, config) {
			$scope.imgcat = data;
	});

	$scope.imgPartners =[
		{ url : 'img/slide2.jpg'},
		{ url : 'img/slide1.jpg'},
		{ url : 'img/slide2.jpg'},
		{ url : 'img/slide1.jpg'},
		{ url : 'img/slide2.jpg'},
		{ url : 'img/slide1.jpg'},
		{ url : 'img/slide2.jpg'},
		{ url : 'img/slide2.jpg'}

	];

	if ($rootScope.count == undefined ) {
		$rootScope.count = 0;
		$rootScope.basket = [
			{  }
		];
	}

	$scope.addModel = function(url) {
		$rootScope.basket[$rootScope.count] = {url: ""}; 
		$rootScope.basket[$rootScope.count].url = url;	
		$rootScope.count++;
	};
	$scope.delModel = function(url) {
		for (var i = 0; i <= $rootScope.basket.length - 1; i++) {
			if ( $rootScope.basket[i].url == url )
			$rootScope.basket.splice(i, 1) 		
		};
		$rootScope.count--;	
	
	};	


 $(document).ready(function() {
     
      $("#owl-demo").owlCarousel({
     
          autoPlay: 3000, //Set AutoPlay to 3 seconds
          items : 4,
          itemsDesktop : [1199,3],
          itemsDesktopSmall : [979,3]
     
      });
     
    });

}]);	


modelsApp.controller("catCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
    //$http.get('model/catalog.json').success(function(data, status, headers, config) {
	//		$scope.imgcat = data;
	//});
	$http.get('http://dt-agency.ru/api/v1/staff').success(function(data, status, headers, config) {
			$scope.imgcat = data;
			console.log('$scope.imgcat', $scope.imgcat  );
	});
	$http.get('http://dt-agency.ru/api/v1/suites').success(function(data, status, headers, config) {
			$scope.sets = data;
			console.log('$scope.sets', $scope.sets);
			

	});
	
	//Добавление товара в корзину		
	$scope.addModel = function(url) {
		$rootScope.basket[$rootScope.count] = { url: "" }; 
		$rootScope.basket[$rootScope.count].url = url;	
		$rootScope.count++;
		
	};
	$scope.delModel = function(url) {
		for (var i = 0; i <= $rootScope.basket.length - 1; i++) {
			if ( $rootScope.basket[i].url == url )
			$rootScope.basket.splice(i, 1) 		
		};
		$rootScope.count--;	
	};

	$scope.addFilt = function (a,b,c) { //a = firstClick, b = номер пункта фильтра, c = клик по пункту меню 
		console.log('firstClick', a);
		if (a == false) {
			$scope.fProf[0] = '';
			$scope.fProf[1] = '';
			$scope.fProf[2] = '';
			$scope.fProf[3] = '';
			$scope.fProf[4] = '';
			$scope.firstClick = true;

		}

		if ((b == 0)&&(c == true)) { $scope.fProf[b] = 'Model'; }
		if ((b == 0)&&(c == false)) { $scope.fProf[b] = ''; }
		if ((b == 1)&&(c == true)) { $scope.fProf[b] = 'Photograph'; }
		if ((b == 1)&&(c == false)) { $scope.fProf[b] = ''; }
		if ((b == 2)&&(c == true)) { $scope.fProf[b] = 'Stylist'; }
		if ((b == 2)&&(c == false)) { $scope.fProf[b] = ''; }
		if ((b == 3)&&(c == true)) { $scope.fProf[b] = 'Visagiste'; }
		if ((b == 3)&&(c == false)) { $scope.fProf[b] = ''; }
		if ((b == 4)&&(c == true)) { $scope.fProf[b] = 'Staff'; }
		if ((b == 4)&&(c == false)) { $scope.fProf[b] = ''; }
			if ((b == 51)&&(c == true)) { $scope.fProf[b] = 'Barman'; $scope.fProf[4] = '';}
			if ((b == 51)&&(c == false)) { $scope.fProf[b] = ''; }
			if ((b == 52)&&(c == true)) { $scope.fProf[b] = 'Waiter'; $scope.fProf[4] = '';}
			if ((b == 52)&&(c == false)) { $scope.fProf[b] = ''; }
		/*
		if (($scope.fProf[0] == '')&&($scope.fProf[1] == '')&&($scope.fProf[2] == '')&&($scope.fProf[3] == '')&&($scope.fProf[4] == '')&&(a == true)) {

				$scope.fProf[0] = 'Model';
				$scope.fProf[1] = 'Photograph';
				$scope.fProf[2] = 'Stylist';
				$scope.fProf[3] = 'Visagiste';
				$scope.fProf[4] = 'Staff';
				$scope.firstClick = false;	
		}
		*/
	}

}]);	

modelsApp.controller("orderCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {

	//Добавление товара в корзину		
	$scope.addModel = function(url) {
		$rootScope.basket[$rootScope.count] = {url: ""}; 
		$rootScope.basket[$rootScope.count].url = url;	
		$rootScope.count++;
		
	};
	$scope.delModel = function(url) {
		for (var i = 0; i <= $rootScope.basket.length - 1; i++) {
			if ( $rootScope.basket[i].url == url )
			$rootScope.basket.splice(i, 1) 		
		};
		$rootScope.count--;	
	};

}]);	

modelsApp.controller("contaktCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
}]);
modelsApp.controller("thxCtrl", ['$scope','$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
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