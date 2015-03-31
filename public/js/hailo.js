'use strict';

var app = angular.module('angularMapsTutorialApp',['uiGmapgoogle-maps']);


app.controller('mapController', function($scope, $http, uiGmapGoogleMapApi) {




$scope.marker = {
        coords: {
            latitude: 51.5085300, longitude: -0.1257400
        },
        icon: 'https://www.hailoapp.com/assets/img/barty.svg',
        options: { draggable: true }
    }


var events = {
    places_changed: function (searchBox, map, eventName, args) {

        var place = searchBox.getPlaces();

        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no place data :(');
            return;
        }

        $scope.drivers = [];
         $scope.marker.coords.latitude = place[0].geometry.location.lat()
        $scope.marker.coords.longitude = place[0].geometry.location.lng()
            $http.get('https://api.hailoapp.com/drivers/near?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + '&api_token=zr47c1qxafu1syNfns8KEmLLtcT9FE5Q9IGS4p6OI1ctyEjQP4mJpnmdiZZMH1YrxgyYm/09rOI2cXIrxdOBkVkxaPCN95OsDMpeENZ3dYEgaQgWAbDKDajr4V5CC2sUAucDrUtNPARMmGv2Cc7d9aDBftGJlSh8enCrIBI/VtC5LhsYFxJXBHr84dPCgV9B4fSwNlLMJYMFsOlSiwDjcA==')
          .success(function(data){
            for (var i = 0; i < data.drivers.length; i++) {

              $scope.drivers.push(data.drivers[i]);
            };
        });

        $scope.map = {

            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 15
        };
        $scope.marker = {
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            },
            icon: 'https://www.hailoapp.com/assets/img/barty.svg'
        };
    }
};

$scope.searchbox = { template: 'searchbox.tpl.html', events: events };



$scope.map = {center: {latitude:  51.5085300, longitude: -0.1257400 }, zoom: 16, events: {
        click: function (map, eventName, args) {

          $scope.drivers = [];
            $scope.marker.coords.latitude = args[0].latLng.lat();
            $scope.marker.coords.longitude = args[0].latLng.lng();

             $scope.$apply();

             $http.get('https://api.hailoapp.com/drivers/near?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + '&api_token=zr47c1qxafu1syNfns8KEmLLtcT9FE5Q9IGS4p6OI1ctyEjQP4mJpnmdiZZMH1YrxgyYm/09rOI2cXIrxdOBkVkxaPCN95OsDMpeENZ3dYEgaQgWAbDKDajr4V5CC2sUAucDrUtNPARMmGv2Cc7d9aDBftGJlSh8enCrIBI/VtC5LhsYFxJXBHr84dPCgV9B4fSwNlLMJYMFsOlSiwDjcA==')
          .success(function(data){
            for (var i = 0; i < data.drivers.length; i++) {

              $scope.drivers.push(data.drivers[i]);
            };
        });

        }


    }

    }

});