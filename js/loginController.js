app.controller('loginController',function($scope, $location){
	$scope.init = function() {
	};

	$scope.member = {};
	
	$scope.onLoginClick = function(){
		var id = $scope.member.id;
		var password = $scope.member.password;
		console.log("id=" +id);
		console.log("password=" +password);
		$location.path('/tab/friendList');
		console.log("You clicked login button.");
	};
	
	$scope.onSignupClick = function(){
		$location.path('/signup');
		console.log("You clicked register button.");
	};
});