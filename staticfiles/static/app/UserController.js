main_app.controller('UserController',function(SendHTTPRequest,$scope,$http,$location,$cookies,$window,$mdDialog){
  $scope.home = function()
  {
    $location.path("/home"); 
  }
  $scope.request = function()
  { 
   data={username: $scope.username,password: $scope.password,app_id : 1}

   SendHTTPRequest.POSTRequest(data,url).then(function(response){
    $window.sessionStorage.setItem("username",response.data.username);
    $window.sessionStorage.setItem("empcode",response.data.customer_code);
    $window.sessionStorage.setItem("location_code",response.data.location_code);
    $window.sessionStorage.setItem("token",response.data.AUTH_TOKEN);
    $window.location.href = "static/Live_Tracking.html";
  },function(data)
  {
   $mdDialog.show(
    $mdDialog.alert()
    .parent(angular.element(document.querySelector('#popupContainer')))
    .clickOutsideToClose(true)
    .title("Error")
    .textContent("try re-entering username and password")
    .ariaLabel('Alert Dialog Demo')
    .ok('Got it!')

    );
 });
 };
});