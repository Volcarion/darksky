(function() {

    angular
        .module('darkskyApp')
        .service('DarkskyWeather', darkskyWeather);
                  //External        Internal
    darkskyWeather.$inject = ['$http'];

    function darkskyWeather($http) {
        var getWeather = function(lat, lon) {
            //darkskyapi/:lat/:lon
            return $http.get('/api/darkskyapi' + '/' + lat + '/' + lon);
        };
        
        return {
            getWeather: getWeather,
        };
    }
})();
