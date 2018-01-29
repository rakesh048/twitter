main_app.controller('deashboardController',function(SendHTTPRequest,$scope,$http,$location,$cookies,$window,$mdDialog){
 $scope.user_name = sessionStorage.getItem("user");
 $scope.home = function()
 {
  $location.path("/home"); 
}
$scope.logout = function()
{
  var send = $http({
    method:'GET',
    url:url+'/logout/',
    headers: {'Content-Type': 'application/json'},
  });
  send.success(function(response){
    console.log(response);
    if(response.success == 'false')
      alert(response.data)
    else
      $scope.data = response.data;
    $window.location = url;
  });
  send.error(function(response){
    alert('Server Error')
  });
};
$scope.tweet = function()
{
  tweet = $scope.description;
  user = sessionStorage.getItem("user");
  if(tweet && user)
  {
    data = {"description":tweet,"user":user};
    var send = $http({
      method:'POST',
      url:url+'/create_tweet/',
      headers: {
        'Content-Type': 'application/json'
      },
      data:data,
    });
    send.success(function(response){
      console.log(response);
      if(response.success == 'false')
        alert(response.data)
      else
        //alert(response.data)
      $scope.description = '';
      $scope.showtweet();
          //$window.location = "http://192.168.1.97:8080";

        });
    send.error(function(response){
      alert('Server Error')
    });
  }
  else
  {
    alert('Enter Username and Password');
  } 
};

$scope.showtweet = function()
{
  var send = $http({
    method:'GET',
    url:url+'/get_tweet/',
    headers: {'Content-Type': 'application/json'},
  });
  send.success(function(response){
    console.log(response);
    if(response.success == 'false')
      alert(response.data)
    else
      $scope.data = response.data;
    console.log('reeee',response.data)
        //$window.location = "http://192.168.1.97:8080";
      });
  send.error(function(response){
    alert('Server Error')
  });
};
$scope.showtweet();


$scope.suggestion = function()
{
  //alert(j);
  var send = $http({
    method:'GET',
    url:url+'/suggestion/',
    headers: {'Content-Type': 'application/json'},
  });
  send.success(function(response){
    if(response.success == 'false')
      alert(response.data)
    else
      $scope.suggestion_list = response.data;

  });
  send.error(function(response){
    alert('Server Error')
  });
}

$scope.suggestion();

$scope.follow = function(j)
{
  var send = $http({
    method:'GET',
    url:url+'/follow/'+j,
    headers: {'Content-Type': 'application/json'},
  });
  send.success(function(response){
    console.log(response);
    if(response.success == 'false')
      alert(response.data)
    else
    {
   $scope.suggestion();
    $scope.showtweet();
  }
  });
  send.error(function(response){
    alert('Server Error')
  });
}

$scope.userunfollow = function(j)
{
  var send = $http({
    method:'GET',
    url:url+'/userunfollow/'+j,
    headers: {'Content-Type': 'application/json'},
  });
  send.success(function(response){
    console.log(response);
    if(response.success == 'false')
      alert(response.data)
    else
    {
   $scope.suggestion();
   $scope.showtweet();
 }
  });
  send.error(function(response){
    alert('Server Error')
  });
}

$scope.liking = function(j)
{ var send = $http({
    method:'GET',
    url:url+'/like/'+j,
    headers: {'Content-Type': 'application/json'},
  });
  send.success(function(response){
    console.log(response);
    if(response.success == 'false')
      alert(response.data)
    else
      $scope.data = response.data;
    $scope.showtweet();
  });
  send.error(function(response){
    alert('Server Error')
  });
}
});
