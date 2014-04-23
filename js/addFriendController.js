app.controller('addFriendController',function($scope){
	$scope.UNREGISTERED = 0;
	$scope.REGISTERED = 1;
	$scope.DELETE = 2;
	
	$scope.state = $scope.UNREGISTERED;
	
	$scope.friend = {};
	
	$scope.init = function() {
		$scope.host = SettingManager.getHost();
		if ($scope.host.registered) {
			$scope.state = $scope.REGISTERED;
		}
	};
	
	$scope.clickAddFriend = function()
	{
		console.log("You clicked add friend button. ID:" + $scope.friend.id);
		$scope.id="";
	};
});