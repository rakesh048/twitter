
var HttpService = angular.module('ServiceHTTP', []);

HttpService.service('SendHTTPRequest', function ($http,$window,$q,$cookies,$location,$mdDialog) {

    this.POSTRequest = function(data,url) 
    {
        var refrer = $q.defer();
        var send = $http({
            method:'POST',
            url:url,
            data:data,
        });
        send.success(function(response){
            refrer.resolve(response);
        });
        send.error(function(response){
            refrer.reject(response);
        });
        return refrer.promise;
    };

    this.GETRequest = function(data,url) 
    {
        var refrer = $q.defer();
        var send = $http({
            method:'GET',
            url:url,
            headers: {'Content-Type': 'application/json'},
        });
        send.success(function(response){
            refrer.resolve(response);
        });
        send.error(function(response){
            refrer.reject(response);
        });
        return refrer.promise;
    };

});