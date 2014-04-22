app.controller('addFriendController',function($scope){
	$scope.UNREGISTERED = 0;
	$scope.REGISTERED = 1;
	$scope.DELETE = 2;
	
	$scope.state = $scope.UNREGISTERED;
	
	$scope.init = function() {
		$scope.host = SettingManager.getHost();
		if ($scope.host.registered) {
			$scope.state = $scope.REGISTERED;
		}
	};
});