
var main_app = angular.module('App', ['ngMaterial','ngSanitize','ngAria','ngAnimate','ngMessages','ngRoute','ngCookies','ServiceHTTP']);

main_app.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {

    $routeProvider.
    when('/home', {
        templateUrl: "static/pages/home.html",
        controller: 'HomeController',
    }).
    when('/dashboard', {
        templateUrl: "static/pages/dashboard.html",
        controller: 'deashboardController',
    }).
    when('/user', {
        templateUrl: "static/pages/user.html",
        controller: 'UserController',
    }).
    otherwise({ redirectTo: '/home' });
}]);




