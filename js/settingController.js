app.controller('settingController',function($scope){
	$scope.name = "Jay";
	$scope.state = "Fucking midterm";
	
	$scope.member = {};
	$scope.clickEdit = function()
	{
		var name = $scope.member.name;
		var state = $scope.member.state;
		console.log("name=" + name);
		console.log("state=" + state);
		console.log("You clicked edit button.");
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