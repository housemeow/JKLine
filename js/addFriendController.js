app.controller('addFriendController',function($scope, $http){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";
	$scope.friend = {};
	
	$scope.clickAddFriend = function()
	{
		console.log("You clicked add friend button. ID:" + $scope.friend.id);
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "SendFriendInvitation",
	        data: {
	            smid:1,
	            rid: $scope.friend.id
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			$scope.friends = response;
		});
	};
});