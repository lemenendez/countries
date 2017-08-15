angular.module('api',[])
.controller('ApiController', ['$scope', '$http', function($scope, $http)
{                   
    $scope.events = new Array();             // model

    // Avoid hard coding the relative Urls, pass the template url
    $scope.setParameters = function (parameters) {
        $scope.parameters = parameters;
    }
    // it loads the events information  the client-side
    $scope.loadEventDetails = function () {
        $scope.events.forEach(function(event) {
        var url = $scope.parameters.eventTemplateUrl.replace('EVENTID',event.Id);
        $http({
                method: 'GET',
                url: url,
            }).then(function successCallback(response) {
               var marker = new google.maps.Marker({
                    position: { lat:event.Latitude, lng: event.Longitude},            
                    map: map,
                    title: event.Name
                }); 

                var infowindow = new google.maps.InfoWindow({
                     content: response.data
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        }, this);
    }

    // it loads the events for the current view
    $scope.getEventsSuccessCallback = function (response) 
    {
        for(var i=0; i<response.data.length; i++) 
        {
            var event = {
                Id: response.data[i].Id,                
                Name: response.data[i].Name,
                Latitude: response.data[i].Latitude,
                Longitude: response.data[i].Longitude
            };            
            $scope.events.push(event);
        }
        $scope.loadEventDetails();
    }    

    $scope.getEventsErrorCallback = function (response) {
        alert('error loading the vents, please reload the web page');
    }

    $scope.LoadEvents = function() {
        var url = $scope.parameters.apiGetEventsTemplateUrl;
        $http.get(url).then($scope.getEventsSuccessCallback, $scope.getEventsErrorCallback);
    }

}]);

