app.controller('settingController',function($scope, $http){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";

	
	$scope.name = "Jay";
	$scope.state = "Fucking midterm";
	
	$scope.member = {};
	$scope.error = {};
	$scope.clickEdit = function()
	{
		var name = $scope.member.name;
		var state = $scope.member.state;
		console.log("name=" + name);
		console.log("state=" + state);
		console.log("You clicked edit button.");
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "EditMember",
	        data: {
	            mid:1,
	            name:$scope.member.name,
	            state:$scope.member.state
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			if(response=="success"){
				$scope.friends = response;
			}else
			{
				$scope.error.message = response;
			}
		});
	};
	$scope.clickRecovery = function()
	{
		var name = $scope.member.name;
		var state = $scope.member.state;
		console.log("name=" + name);
		console.log("state=" + state);
		console.log("You clicked edit button.");
		console.log("You clicked recovery button.");
	};
});