'use strict';

var app = angular.module('angularMapsTutorialApp',['uiGmapgoogle-maps']);


app.controller('mapController', function($scope, $http, uiGmapGoogleMapApi) {


  $scope.greeting= "hello";

        $scope.drivers = [];

        //  $http.get('https://api.hailoapp.com/drivers/near?latitude=51.5085300&longitude=-0.1257400&api_token=zr47c1qxafu1syNfns8KEmLLtcT9FE5Q9IGS4p6OI1ctyEjQP4mJpnmdiZZMH1YrxgyYm/09rOI2cXIrxdOBkVkxaPCN95OsDMpeENZ3dYEgaQgWAbDKDajr4V5CC2sUAucDrUtNPARMmGv2Cc7d9aDBftGJlSh8enCrIBI/VtC5LhsYFxJXBHr84dPCgV9B4fSwNlLMJYMFsOlSiwDjcA==')
        //   .success(function(data){
        //     for (var i = 0; i < data.drivers.length; i++) {
        //       $scope.drivers.push(data.drivers[i]);
        //     };
        //     console.log($scope.drivers)
        // });


$scope.map = {center: {latitude:  51.5085300, longitude: -0.1257400 }, zoom: 14, events: {
        click: function (map, eventName, args) {

          $scope.drivers = [];
            $scope.marker.coords.latitude = args[0].latLng.lat();
            $scope.marker.coords.longitude = args[0].latLng.lng();


             $http.get('https://api.hailoapp.com/drivers/near?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + '&api_token=zr47c1qxafu1syNfns8KEmLLtcT9FE5Q9IGS4p6OI1ctyEjQP4mJpnmdiZZMH1YrxgyYm/09rOI2cXIrxdOBkVkxaPCN95OsDMpeENZ3dYEgaQgWAbDKDajr4V5CC2sUAucDrUtNPARMmGv2Cc7d9aDBftGJlSh8enCrIBI/VtC5LhsYFxJXBHr84dPCgV9B4fSwNlLMJYMFsOlSiwDjcA==')
          .success(function(data){
            for (var i = 0; i < data.drivers.length; i++) {

              $scope.drivers.push(data.drivers[i]);
            };
        });
        },
        zoom_changed: function(map, eventName, args) {

          $scope.map.center = $scope.marker.coords
        }

    }
    }

$scope.marker = {
        coords: {
            latitude: 51.5085300, longitude: -0.1257400
        },
        icon: 'https://www.hailoapp.com/assets/img/barty.svg',
        options: { draggable: true }
    }

      });