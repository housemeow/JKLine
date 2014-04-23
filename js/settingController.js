app.controller('settingController',function($scope){
	$scope.name = "Jay";
	$scope.state = "Fucking midterm";
	$scope.clickEdit = function()
	{
		console.log("You clicked edit button.");
	};
	$scope.clickRecovery = function()
	{
		console.log("You clicked recovery button.");
	};
});