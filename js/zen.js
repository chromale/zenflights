var zen = angular.module('zen', []);

zen.directive('datepicker', function() {
   return function(scope, element, attrs) {
       element.datepicker({
           inline: true,
           dateFormat: 'dd.mm.yyyy',
           onSelect: function(dateText) {
               var modelPath = $(this).attr('ng-model');
               putObject(modelPath, scope, dateText);
               scope.$apply();
           }
       });
   }
});

zen.controller('zenCtrl', function($scope, $http) {

	function findFrom(fromData) {
		$from = fromData;
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

// Watching place input fields and fetch it with data
	$scope.$watch('search.from', function(from) {
		if (from.length > 2) {
			findFrom(from);
		}
	 }, true);

	$scope.$watch('search.to', function(to) {
		if (to.length > 2) {
			findTo(to);
		}
	 }, true);

// Search flights by submit search form
	$scope.findFlights = function(data) {
	  		$query = data;
			$dateFrom = data.dateFrom; 
			$dateTo = data.dateTo;
	  		$http({
				method: 'GET',
				url: 'https://api.skypicker.com/flights?v=2&locale=en&flyFrom='+ $query.from +'&to='+ $query.to +'&dateFrom='+ $dateFrom +'&dateTo=' + $dateTo,
				timeout: 3000
			}).then(function successCallback(response) {
				$scope.flights = response.data.data.slice(0, 20);
			}, function errorCallback(response) {
				$scope.from = '';
			});
	}
});
