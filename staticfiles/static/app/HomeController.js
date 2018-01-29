main_app.controller('HomeController',function(SendHTTPRequest,$scope,$http,$location,$cookies,$window,$mdDialog){
	$scope.login_page = 'True';
	$scope.login = function()
	{ 
		$scope.login_page = 'True';
		$scope.reg_page = 'False';
	};
	$scope.loginsubmit = function()
	{
		username = $scope.username;
		password = $scope.password;
		if(username && password)
		{
			data = {"username":username,"password":password};
			var send = $http({
				method:'POST',
				url:url+'/loginnn/',
				headers: {
					'Content-Type': 'application/json'
				},
				data:data,
			});
			send.success(function(response){
				console.log(response);
				if(response.success == 'false')
				{
					alert(response.data)
				}
				else
				{
					sessionStorage.setItem("user",username);
					$location.path("/dashboard");
				}

			});
			send.error(function(response){
				//alert('username/password missmateched!!')
			});
		}
		else
		{
			alert('Enter Username and Password');
		} 
	};

	$scope.register = function()
	{
		$scope.login_page = 'False';
		$scope.reg_page = 'True';
	}
	$scope.registersubmit = function()
	{
		username = $scope.username;
		email = $scope.email;
		age = $scope.age;
		gender = $scope.gender;
		mobile = $scope.mobile;
		password = $scope.password;
		if(username && mobile && password && gender && age && email)
		{
			data = {"username":username,"password":password,"email":email,"age":age,"gender":gender,"mobile":mobile};
			var send = $http({
				method:'POST',
				url:url+'/signup/',
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
					alert('Congratulations You Have Registered Go For Login..');
				$window.location = url;

			});
			send.error(function(response){
				alert('Server Error')
			});
		}
		else
		{
			alert('All Fields are mandatory!!');
		} 
	};
});
