app.controller('signupController',function($scope, $location){
	
	$scope.member = {};
	
	$scope.onSignupClick = function(){
		$location.path("/tab/friendList");
		var id = $scope.member.id;
		var name = $scope.member.name;
		var password = $scope.member.password;
		var checkPassword = $scope.member.checkPassword;

		console.log("id=" + id);
		console.log("name=" + name);
		console.log("password=" + password);
		console.log("checkPassword=" + checkPassword);
		console.log("You clicked register button.");
	};
});