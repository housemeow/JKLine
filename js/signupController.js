app.controller('signupController',function($scope, $location){
	$scope.onSignupClick = function(){
		$location.path("/tab/friendList");
		console.log("You clicked register button.");
	};
});