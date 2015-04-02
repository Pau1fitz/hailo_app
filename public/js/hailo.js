"use strict";
/*jshint globalstrict: true*/
// Defines that JavaScript code should be executed strict mode

var app = angular.module('hailoApp',['uiGmapgoogle-maps']);
//defines the Angular app to be used in view
//ui googlemap dependency injected here to enable maps

app.controller('mapController', function($scope, $http, uiGmapGoogleMapApi) {

  //API Token
  var KEY = key();
  var defaultLat = 51.5085300;
  var defaultLong = -0.1257400;
  $scope.view = 0;

  //function used to update the map
  function updateMap(lat, long, zoomIndex){
    $scope.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: zoomIndex
    };
  }

  //function used to update the user/marker
  function updateMarker(lat, long){
    $scope.marker = {
      coords: {
          latitude: lat,
          longitude: long
      },
      options : {
        animation: google.maps.Animation.DROP
      },
      icon: 'https://www.hailoapp.com/assets/img/barty.svg'
    };
  }

  //add the marker to the map when page loads
  updateMarker(defaultLat, defaultLong);

  //options for the map
  $scope.options = {
    scrollwheel: false,
    streetViewControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  };

  //setting up map
  $scope.map = {
    center: {
      latitude:  defaultLat,
      longitude: defaultLong
    },
    zoom: 15,
    //map events
    events: {

      places_changed: function (searchBox) {
        //set the view to zero so no ETA displayed if no taxis in vacinity
        $scope.view = 0;

        var place = searchBox.getPlaces();

        //displays error if user inputs unknown location
        if (!place || place == 'undefined' || place.length === 0) {
          $scope.view = 2;
          return;
        }

        //long and lat coordinates returned by input
        var marker_lat = place[0].geometry.location.lat();
        var marker_lng = place[0].geometry.location.lng();

        //GET request to find the drivers ETA
        $http.get('https://api.hailoapp.com/drivers/eta?latitude=' + marker_lat + '&longitude=' +  marker_lng  + KEY)
        .success(function(data){
          $scope.ETA = data.etas[0].eta + " min";
          if(data.etas[0].eta > 1) $scope.ETA += "s";
          $scope.view = 1;
        }).error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
        });

        //update marker and map
        updateMarker(marker_lat, marker_lng);
        updateMap(marker_lat, marker_lng, $scope.map.zoom );

        //clear the drivers array where the drivers are stored
        $scope.drivers = [];

        //Drivers located near the user
        $http.get('https://api.hailoapp.com/drivers/near?latitude=' + marker_lat + '&longitude=' + marker_lng  + KEY).
        success(function(data, status) {
         for (var i = 0; i < data.drivers.length; i++) {
            $scope.drivers.push(data.drivers[i]);
          }
        }).error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
        });
      }
    }
  };



  //searchbox configuration
  $scope.searchbox = {
    template: 'searchbox.tpl.html',
    events: $scope.map.events,
    position: 'TOP_LEFT'
  };
});