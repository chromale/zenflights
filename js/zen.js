var zen = angular.module('zen', []);
zen.controller('customersCtrl', function($scope, $http) {
    $http.get("customers.php").then(function (response) {
        $scope.names = response.data.records;
    });
});