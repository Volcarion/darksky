(function() {

    angular
        .module('darkskyApp')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$scope', 'SelectedData', 'DarkskyWeather'];

    function weatherCtrl($scope, SelectedData, DarkskyWeather) {

        var vm = this;
        console.log(window.location);

        vm.content = "Weather";

        vm.selectedDepartureICAO = "";
        vm.selectedArrivalICAO = "";
        vm.selectedWeight = "";

        //check selected Departure
        if (SelectedData.selectedDepartureICAO !== null) {
            vm.selectedDepartureICAO = SelectedData.selectedDepartureICAO;
        }
        
        //check selected Arrival
        if (SelectedData.selectedArrivalICAO !== null) {
            vm.selectedArrivalICAO = SelectedData.selectedArrivalICAO;
        }

        //check selected weight
        if (SelectedData.selectedWeight !== null) {
            vm.selectedWeight = SelectedData.selectedWeight;
        }
        
        
        var lat =0;
        var lon =0;
        
        /*global navigator*/
        

        



        //refactored for Angular 1.6 - removed success/error, used Promises...
        vm.getDepartureWeather = function() {
            
            if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(showLocation);
                }else{
                    console.log('Geolocation is not supported by this browser.');
                }
            
            //var lat = "35.221997";
            //console.log(lat);
            //var lon = "-101.831297";
            //console.log(lon);            
            function showLocation(position){
            lat = position.coords.latitude;
            console.log("latitude: " + lat);
            lon = position.coords.longitude;
            console.log("longitude: " + lon);
        
            DarkskyWeather.getWeather(lat, lon)
                .then(function(response) {
                    vm.departureWeather = response.data;
                    console.log(vm.departureWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
        }
        }
        //refactored for Angular 1.6 - removed success/error, used Promises...        
        /*vm.getArrivalWeather = function() {
            
            var lat = "35.221997";
            var lon = "-101.831297";

            //refactored for Angular 1.6 - removed success/error, used Promises...
            DarkskyWeather.getWeather(lat, lon)
                .then(function(response) {
                    vm.arrivalWeather = response.data;
                    console.log(vm.arrivalWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
        }*/
        
        //call services
        vm.getDepartureWeather();
        //vm.getArrivalWeather();

    }

})();