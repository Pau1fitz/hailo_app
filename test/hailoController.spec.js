describe('hailoController', function() {
    beforeEach(module('hailoApp'));

    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller, $http) {
        http = $http;
        scope = $rootScope.$new();
        ctrl = $controller('hailoController', {
            $scope: scope,
            $http: http
            // uiGmapGoogleMapApi: {}
        });
    }));

    it('should initialise with an empty search result and term', function() {
      expect(scope.searchResult).toBeUndefined();
      expect(scope.searchTerm).toBeUndefined();
    });

});