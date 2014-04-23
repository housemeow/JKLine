app.controller('loginController',function($scope, $location){
	$scope.init = function() {
	};

	
	$scope.onLoginClick = function(){
		var id = $scope.id;
		var password = $scope.password;
		var confirmPassword = $scope.confirmPassword;

		$location.path('/tab/friendList');
		console.log("You clicked login button.");
	};
	
	$scope.onSignupClick = function(){
		$location.path('/signup');
		console.log("You clicked register button.");
	};
});