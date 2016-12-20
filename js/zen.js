var zen = angular.module('zen', []);


zen.directive('datepicker', function() {
   return function(scope, element, attrs) {
       element.datepicker({
           inline: true,
           dateFormat: 'dd.mm.yy',
           onSelect: function(dateText) {
               var modelPath = $(this).attr('ng-model');
               putObject(modelPath, scope, dateText);
               scope.$apply();
           }
       });
   }
});

zen.controller('zenCtrl', function($scope, $http) {
    $scope.from = '';
    $scope.to = '';


function findFrom(fromData) {
	$from = fromData;
  	// initialisation stuff here
  		$http({
			method: 'GET',
			url: 'https://api.skypicker.com/places?term=' + $from + '&v=2&locale=en',
			timeout: 3000
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.completeFrom = response.data;

		}, function errorCallback(response) {
			$scope.from = '';
		});
}

function findTo(fromData) {
	$from = fromData;
  	// initialisation stuff here
  		$http({
			method: 'GET',
			url: 'https://api.skypicker.com/places?term=' + $from + '&v=2&locale=en',
			timeout: 3000
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.completeTo = response.data;

		}, function errorCallback(response) {
			$scope.to = '';
		});
}


$scope.$watch('from', function(from) {
	if (from.length > 2) {
		findFrom(from);
	}
 }, true);

$scope.$watch('to', function(to) {
	if (to.length > 2) {
		findTo(to);
	}
 }, true);


$scope.findFlights = function() {
	console.log("Fuck");
  	// initialisation stuff here
  		$http({
			method: 'GET',
			url: 'https://api.skypicker.com/flights?v=2&locale=en&flyFrom=prague_cz&to=paris_fr&dateFrom=22%2F12%2F2016&dateTo=30%2F12%2F2016',
			timeout: 3000
		}).then(function successCallback(response) {
			console.log(response.data.data);
			$scope.flights = response.data.data;

		}, function errorCallback(response) {
			$scope.from = '';
		});
}


    	



});