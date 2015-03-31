'use strict';

// Defines that JavaScript code should be executed strict mode

var app = angular.module('angularMapsTutorialApp',['uiGmapgoogle-maps']);
//defines the Angular app to be used in view

app.controller('mapController', function($scope, $http, uiGmapGoogleMapApi) {

  var key = '&api_token=zr47c1qxafu1syNfns8KEmLLtcT9FE5Q9IGS4p6OI1ctyEjQP4mJpnmdiZZMH1YrxgyYm/09rOI2cXIrxdOBkVkxaPCN95OsDMpeENZ3dYEgaQgWAbDKDajr4V5CC2sUAucDrUtNPARMmGv2Cc7d9aDBftGJlSh8enCrIBI/VtC5LhsYFxJXBHr84dPCgV9B4fSwNlLMJYMFsOlSiwDjcA=='

  //ui googlemap dependency injected here to enable maps

  function updateMap(lat, long, zoomIndex){
    $scope.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: zoomIndex
    }
  };

    $scope.map =
      {
        center: {
          latitude:  51.5085300,
          longitude: -0.1257400
        },
        zoom: 15,
        events: {

           places_changed: function (searchBox, map, eventName, args) {

        var place = searchBox.getPlaces();

        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no place data');
            return;
        }

        updateMap(place[0].geometry.location.lat(), place[0].geometry.location.lng(), 15 );

        // $scope.map = {

        //     "center": {
        //         "latitude": place[0].geometry.location.lat(),
        //         "longitude": place[0].geometry.location.lng()
        //     },
        //     "zoom": 15
        // };
          $scope.drivers = [];
        console.log($scope.marker.coords.latitude)
         $scope.marker.coords.latitude = place[0].geometry.location.lat()
        $scope.marker.coords.longitude = place[0].geometry.location.lng()
            $http.get('https://api.hailoapp.com/drivers/near?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + key)
          .success(function(data){
            for (var i = 0; i < data.drivers.length; i++) {
              $scope.drivers.push(data.drivers[i]);
            };
        });
        $scope.marker = {
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            },
            icon: 'https://www.hailoapp.com/assets/img/barty.svg'
        };
    },
          click: function (map, eventName, args) {
            $scope.drivers = [];
            $scope.marker.coords.latitude = args[0].latLng.lat();
            $scope.marker.coords.longitude = args[0].latLng.lng();
             $http.get('https://api.hailoapp.com/drivers/near?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + key)
            .success(function(data){
              for (var i = 0; i < data.drivers.length; i++) {
              $scope.drivers.push(data.drivers[i]);
            };
          });
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
      $scope.searchbox = { template: 'searchbox.tpl.html', events: $scope.map.events };
});