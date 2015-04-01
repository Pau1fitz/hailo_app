'use strict';
// Defines that JavaScript code should be executed strict mode

var app = angular.module('hailoApp',['uiGmapgoogle-maps']);
//defines the Angular app to be used in view
//ui googlemap dependency injected here to enable maps

app.controller('mapController', function($scope, $http, uiGmapGoogleMapApi) {

  //API Token
  var KEY = '&api_token=zr47c1qxafu1syNfns8KEmLLtcT9FE5Q9IGS4p6OI1ctyEjQP4mJpnmdiZZMH1YrxgyYm/09rOI2cXIrxdOBkVkxaPCN95OsDMpeENZ3dYEgaQgWAbDKDajr4V5CC2sUAucDrUtNPARMmGv2Cc7d9aDBftGJlSh8enCrIBI/VtC5LhsYFxJXBHr84dPCgV9B4fSwNlLMJYMFsOlSiwDjcA=='

  var defaultLat = 51.5085300;
  var defaultLong = -0.1257400;
  var ETA;
  $scope.view = 0;

  //function used to update the map after API call.
  function updateMap(lat, long, zoomIndex){
    $scope.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: zoomIndex
    }
  };

  //sets up marker when map is first created
  $scope.marker = {
        coords: {
            latitude: defaultLat,
            longitude: defaultLong
        },
        icon: 'https://www.hailoapp.com/assets/img/barty.svg',
        options : {
          animation: google.maps.Animation.BOUNCE
        }
  };

  //options for the map. Have turned off the scrollwheel,removed the streetview option and made the zoom-slider smaller
  $scope.options = {
    scrollwheel: false,
    streetViewControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
  };

  //setting up map
  $scope.map =
    {
      center: {
        latitude:  defaultLat,
        longitude: defaultLong
      },
        zoom: 15,
        //map events
        events: {

    places_changed: function (searchBox, map, eventName, args) {

      var place = searchBox.getPlaces();

        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no such place');
            return;
        }

        //API request to find the drivers ETA
      $http.get('https://api.hailoapp.com/drivers/eta?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + KEY)
        .success(function(data){
          $scope.ETA = data.etas[0].eta + " min";
          if(data.etas[0].eta > 1)$scope.ETA += "s";
          $scope.view = 1;
        });


        //clear the drivers array where the drivers are stored
        $scope.drivers = [];

          $scope.marker =
            {
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            },
            icon: 'https://www.hailoapp.com/assets/img/barty.svg',
              options: {animation: google.maps.Animation.DROP}
        };

            $http.get('https://api.hailoapp.com/drivers/near?latitude=' + $scope.marker.coords.latitude + '&longitude=' + $scope.marker.coords.longitude  + KEY)
          .success(function(data){
            for (var i = 0; i < data.drivers.length; i++) {
              $scope.drivers.push(data.drivers[i]);
            };
        });

          updateMap(place[0].geometry.location.lat(), place[0].geometry.location.lng(), $scope.map.zoom );


    }

      }
    }


      $scope.searchbox = { template: 'searchbox.tpl.html', events: $scope.map.events, position: 'TOP_LEFT' };
});